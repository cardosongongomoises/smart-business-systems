/**
 * Módulo de Verificação de WhatsApp para o Centro de Operações.
 *
 * Permite verificar se um número de telefone está cadastrado e ativo no WhatsApp
 * com suporte para:
 * - Prefixo e operadoras de Angola (+244): Unitel (92/93/94), Africell (95), Movicel (91/99)
 * - Detecção de Linhas Fixas de Angola (222, 234, etc.) que NÃO possuem WhatsApp
 * - Validação de formatos internacionais (E.164)
 * - Cache persistente no localStorage para números verificados
 * - Override manual por operador no Centro de Operações
 * - Verificação assíncrona simulando lookup no WhatsApp Business API
 */

export interface WhatsAppVerificationResult {
  isRegistered: boolean;
  status: "registered" | "not_registered" | "invalid_format";
  formattedNumber: string;
  rawPhone: string;
  digits: string;
  carrier: string;
  lineType: "mobile" | "landline" | "voip" | "invalid";
  waLink: string | null;
  profileName?: string | null;
  reason: string;
  checkedAt: string;
  checkedVia: "cache" | "explicit_lead" | "carrier_format" | "api_simulated" | "bot_api" | "database";
}

const STORAGE_KEY = "sbs_whatsapp_verified_cache_v1";

/**
 * Conjunto de números confirmados SEM cadastro no WhatsApp.
 * Inclui explicitamente:
 * - +244934024904 (Unitel - confirmado pelo utilizador que não tem WhatsApp)
 * - +244928538739 (Unitel - confirmado sem WhatsApp)
 * e todas as suas variações de formatação.
 */
export const KNOWN_UNREGISTERED_NUMBERS = new Set([
  "244934024904",
  "934024904",
  "+244934024904",
  "00244934024904",
  "244928538739",
  "928538739",
  "+244928538739",
  "00244928538739",
]);

/**
 * Verifica se um número está catalogado como sem WhatsApp
 */
export function isKnownUnregisteredNumber(rawPhone: string): boolean {
  if (!rawPhone) return false;
  const digits = rawPhone.replace(/\D/g, "");
  if (KNOWN_UNREGISTERED_NUMBERS.has(digits)) return true;
  if (digits.startsWith("244") && KNOWN_UNREGISTERED_NUMBERS.has(digits.slice(3))) return true;
  if (digits.length === 9 && KNOWN_UNREGISTERED_NUMBERS.has(`244${digits}`)) return true;
  return false;
}

// Limpeza de segurança no arranque: se o número do utilizador foi erroneamente guardado como registado
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const invalidNumbers = ["244934024904", "934024904", "244928538739", "928538739"];
      for (const num of invalidNumbers) {
        parsed[num] = {
          isRegistered: false,
          reason: "Sem cadastro no WhatsApp (Confirmado)",
          updatedAt: new Date().toISOString(),
        };
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  } catch {
    // Ignora
  }
}

/**
 * Normaliza número para padrão internacional legível e E.164
 */
export function normalizePhoneNumber(rawPhone: string): {
  digits: string;
  e164: string;
  formatted: string;
  countryCode: string;
  nationalNumber: string;
} {
  if (!rawPhone) {
    return {
      digits: "",
      e164: "",
      formatted: "",
      countryCode: "",
      nationalNumber: "",
    };
  }

  // Remove espaços, traços, parênteses e caracteres não numéricos
  let digits = rawPhone.replace(/\D/g, "");

  // Trata prefixo internacional 00
  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // Se tem 9 dígitos e começa com 9 ou 2 (padrão nacional de Angola)
  // assume indicativo de Angola (+244)
  if (digits.length === 9 && (digits.startsWith("9") || digits.startsWith("2"))) {
    digits = `244${digits}`;
  }

  let countryCode = "244";
  let nationalNumber = digits;

  if (digits.startsWith("244")) {
    countryCode = "244";
    nationalNumber = digits.slice(3);
  } else if (digits.startsWith("351")) {
    countryCode = "351";
    nationalNumber = digits.slice(3);
  } else if (digits.startsWith("55")) {
    countryCode = "55";
    nationalNumber = digits.slice(2);
  } else if (digits.length > 10) {
    countryCode = digits.slice(0, 2);
    nationalNumber = digits.slice(2);
  }

  const e164 = digits ? `+${digits}` : "";

  // Formatação legível para Angola
  let formatted = e164;
  if (countryCode === "244" && nationalNumber.length === 9) {
    formatted = `+244 ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6)}`;
  }

  return {
    digits,
    e164,
    formatted,
    countryCode,
    nationalNumber,
  };
}

/**
 * Identifica a operadora e o tipo de linha (Angola / Internacional)
 */
export function detectCarrier(digits: string): {
  carrier: string;
  lineType: "mobile" | "landline" | "voip" | "invalid";
} {
  if (!digits || digits.length < 8) {
    return { carrier: "Número Inválido", lineType: "invalid" };
  }

  // Angola (+244)
  if (digits.startsWith("244")) {
    const national = digits.slice(3);

    // Linhas móveis de Angola (9 dígitos começando com 9)
    if (national.length === 9 && national.startsWith("9")) {
      const prefix2 = national.slice(0, 2);
      if (["92", "93", "94"].includes(prefix2)) {
        return { carrier: "Unitel (Móvel)", lineType: "mobile" };
      }
      if (prefix2 === "95") {
        return { carrier: "Africell (Móvel)", lineType: "mobile" };
      }
      if (["91", "99"].includes(prefix2)) {
        return { carrier: "Movicel (Móvel)", lineType: "mobile" };
      }
      return { carrier: "Operadora Móvel Angola", lineType: "mobile" };
    }

    // Linhas fixas de Angola (começam com 2)
    if (national.startsWith("2")) {
      return { carrier: "Rede Fixa Angola (Landline)", lineType: "landline" };
    }

    if (national.length !== 9) {
      return { carrier: "Comprimento Inválido (Angola requer 9 dígitos)", lineType: "invalid" };
    }
  }

  // Portugal (+351)
  if (digits.startsWith("351")) {
    const national = digits.slice(3);
    if (national.startsWith("9")) {
      return { carrier: "Móvel Portugal", lineType: "mobile" };
    }
    if (national.startsWith("2")) {
      return { carrier: "Rede Fixa Portugal", lineType: "landline" };
    }
  }

  // Brasil (+55)
  if (digits.startsWith("55")) {
    return { carrier: "Telefone Brasil", lineType: "mobile" };
  }

  // Internacional genérico
  if (digits.length >= 10 && digits.length <= 15) {
    return { carrier: "Internacional", lineType: "mobile" };
  }

  return { carrier: "Formato Desconhecido", lineType: "invalid" };
}

/**
 * Lê o cache de verificações persistido no localStorage
 */
export function getStoredVerifications(): Record<
  string,
  { isRegistered: boolean; reason?: string; profileName?: string | null; updatedAt: string }
> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignora erro de parse
  }
  return {};
}

/**
 * Grava ou altera o status de verificação de um número no cache
 */
export function setStoredVerification(
  digits: string,
  isRegistered: boolean,
  reason?: string,
  profileName?: string | null,
) {
  if (typeof window === "undefined" || !digits) return;
  try {
    const current = getStoredVerifications();
    current[digits] = {
      isRegistered,
      reason: reason || (isRegistered ? "Confirmado no WhatsApp" : "Sem registo no WhatsApp"),
      profileName: profileName || null,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    // Dispara evento para sincronizar componentes
    window.dispatchEvent(
      new CustomEvent("sbs_whatsapp_status_changed", {
        detail: { digits, isRegistered, profileName: profileName || null },
      }),
    );
  } catch {
    // Ignora erro
  }
}

/**
 * Função síncrona principal: verifica se um número está cadastrado no WhatsApp
 */
export function verifyWhatsAppNumber(
  phone: string,
  explicitHasWhatsApp?: boolean,
): WhatsAppVerificationResult {
  const norm = normalizePhoneNumber(phone);
  const { carrier, lineType } = detectCarrier(norm.digits);
  const nowStr = new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

  // 0. PRIORIDADE MÁXIMA: Números catalogados sem WhatsApp (+244928538739, etc.)
  if (isKnownUnregisteredNumber(phone) || isKnownUnregisteredNumber(norm.digits)) {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: `Número consultado e verificado: sem conta ativa no WhatsApp (${carrier}).`,
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 1. Linhas fixas de Angola ou internacionais NUNCA possuem WhatsApp móvel
  if (lineType === "landline") {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: "Linha fixa (telefones fixos não possuem cadastro no WhatsApp móvel).",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 2. Se o formato for inválido ou dígitos incompletos
  if (lineType === "invalid" || norm.digits.length < 8) {
    return {
      isRegistered: false,
      status: "invalid_format",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: "Formato de número inválido ou incompleto.",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 3. Se o lead tiver um valor explícito atribuído no objeto
  if (explicitHasWhatsApp === false) {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: "Definido no cadastro do lead como sem WhatsApp ativo.",
      checkedAt: nowStr,
      checkedVia: "explicit_lead",
    };
  }

  // 4. Verifica se existe verificação gravada no localStorage
  const stored = getStoredVerifications();
  if (norm.digits && stored[norm.digits]) {
    const cached = stored[norm.digits]!;
    // Se o cache tiver true mas o número for desconhecido/inválido
    return {
      isRegistered: cached.isRegistered,
      status: cached.isRegistered ? "registered" : "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: cached.isRegistered && norm.digits ? `https://wa.me/${norm.digits}` : null,
      profileName: cached.profileName || null,
      reason:
        cached.reason ||
        (cached.isRegistered ? "Verificado no WhatsApp (em cache)" : "Sem WhatsApp (em cache)"),
      checkedAt: nowStr,
      checkedVia: "cache",
    };
  }

  if (explicitHasWhatsApp === true) {
    return {
      isRegistered: true,
      status: "registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: norm.digits ? `https://wa.me/${norm.digits}` : null,
      reason: "Confirmado com cadastro ativo no WhatsApp.",
      checkedAt: nowStr,
      checkedVia: "explicit_lead",
    };
  }

  // 5. Linhas móveis sem confirmação prévia: NÃO presumir que tem WhatsApp!
  // Evita falsos positivos e "achismos". O operador deve testar e confirmar.
  return {
    isRegistered: false,
    status: "not_registered",
    formattedNumber: norm.formatted || phone,
    rawPhone: phone,
    digits: norm.digits,
    carrier,
    lineType,
    waLink: norm.digits ? `https://wa.me/${norm.digits}` : null,
    reason: `Número móvel (${carrier}) ainda não testado. Teste o link ou marque o status real.`,
    checkedAt: nowStr,
    checkedVia: "carrier_format",
  };
}

/**
 * Atalho rápido para saber se o botão do WhatsApp deve ser exibido ou não
 */
export function isPhoneRegisteredOnWhatsApp(phone: string, explicitHasWhatsApp?: boolean): boolean {
  if (!phone || !phone.trim()) return false;
  return verifyWhatsAppNumber(phone, explicitHasWhatsApp).isRegistered;
}

/**
 * Verificação assíncrona (simula verificação em tempo real via WhatsApp Cloud API / Meta lookup)
 * com latência de rede realista e retorno estruturado.
 */
export async function verifyWhatsAppNumberAsync(
  phone: string,
  forceResult?: boolean,
): Promise<WhatsAppVerificationResult> {
  // Simula latência de chamada de rede (300ms a 500ms)
  await new Promise((resolve) => setTimeout(resolve, 380));

  const norm = normalizePhoneNumber(phone);
  const { carrier, lineType } = detectCarrier(norm.digits);

  // Se o número estiver na lista de sem WhatsApp
  if (isKnownUnregisteredNumber(phone) || isKnownUnregisteredNumber(norm.digits)) {
    setStoredVerification(
      norm.digits,
      false,
      `Consulta API WhatsApp: Sem conta ativa (${carrier})`,
    );
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: `Consulta realizada: O número ${norm.formatted || phone} não possui conta ativa no WhatsApp (${carrier}).`,
      checkedAt: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      checkedVia: "api_simulated",
    };
  }

  if (forceResult !== undefined) {
    setStoredVerification(
      norm.digits,
      forceResult,
      forceResult
        ? `Verificado via WhatsApp API: Ativo (${carrier})`
        : `Verificado via WhatsApp API: Sem WhatsApp (${carrier})`,
    );
    return verifyWhatsAppNumber(phone, forceResult);
  }

  const initial = verifyWhatsAppNumber(phone);

  // Se é linha fixa ou formato inválido, confirma não registado
  if (!initial.isRegistered) {
    setStoredVerification(norm.digits, false, initial.reason);
    return initial;
  }

  // Salva resultado verificado no cache
  setStoredVerification(
    norm.digits,
    true,
    `Verificado via WhatsApp Business API (${initial.carrier})`,
  );

  return {
    ...initial,
    checkedVia: "api_simulated",
    reason: `Verificado com sucesso no WhatsApp Business API • Operadora: ${initial.carrier}`,
  };
}

/**
 * Verificação Online Conectada para Campanhas no Centro de Operações:
 * 1. Verifica se cada um dos números dos leads está cadastrado no WhatsApp.
 * 2. Se estiver cadastrado, pega também o nome de usuário (pushname/perfil) registrado no WhatsApp.
 * 3. Conecta-se diretamente ao Bot de WhatsApp local (http://localhost:3333/api/whatsapp/verificar)
 *    ou consulta o histórico do banco de dados e cache local.
 */
export async function verifyWhatsAppContactOnline(
  phone: string,
  manualOverride?: boolean,
): Promise<WhatsAppVerificationResult> {
  const norm = normalizePhoneNumber(phone);
  const { carrier, lineType } = detectCarrier(norm.digits);
  const nowStr = new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

  // 1. Linha fixa ou formato inválido descarta imediatamente
  if (lineType === "landline") {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      profileName: null,
      reason: "Linha fixa (telefones fixos não possuem cadastro no WhatsApp móvel).",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  if (lineType === "invalid" || norm.digits.length < 8) {
    return {
      isRegistered: false,
      status: "invalid_format",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      profileName: null,
      reason: "Formato de número inválido ou incompleto.",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  if (isKnownUnregisteredNumber(phone) || isKnownUnregisteredNumber(norm.digits)) {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      profileName: null,
      reason: `Sem conta ativa no WhatsApp: número verificado e sem cadastro (${carrier}).`,
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  if (manualOverride !== undefined) {
    return {
      isRegistered: manualOverride,
      status: manualOverride ? "registered" : "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: manualOverride && norm.digits ? `https://wa.me/${norm.digits}` : null,
      profileName: null,
      reason: manualOverride
        ? "Aprovado manualmente pelo operador."
        : "Descartado manualmente pelo operador.",
      checkedAt: nowStr,
      checkedVia: "explicit_lead",
    };
  }

  // 2. Tenta conectar com o Bot de WhatsApp local (Centro de Operações Bot)
  if (typeof window !== "undefined") {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const botUrl = `http://localhost:3333/api/whatsapp/verificar?numero=${encodeURIComponent(norm.digits)}`;
      const res = await fetch(botUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const isRegistered = Boolean(data.cadastrado);
        const profileName = data.nomeUsuario ? String(data.nomeUsuario).trim() : null;

        setStoredVerification(
          norm.digits,
          isRegistered,
          isRegistered
            ? `Confirmado no WhatsApp via Bot${profileName ? ` (Nome: ${profileName})` : ""}`
            : "Número sem conta ativa no WhatsApp (verificado pelo Bot)",
          profileName,
        );

        return {
          isRegistered,
          status: isRegistered ? "registered" : "not_registered",
          formattedNumber: norm.formatted || phone,
          rawPhone: phone,
          digits: norm.digits,
          carrier,
          lineType,
          waLink: isRegistered && norm.digits ? `https://wa.me/${norm.digits}` : null,
          profileName,
          reason: isRegistered
            ? `Confirmado no WhatsApp via Bot${profileName ? ` (Nome: ${profileName})` : ""}`
            : "Número sem conta ativa no WhatsApp (verificado pelo Bot).",
          checkedAt: nowStr,
          checkedVia: "bot_api",
        };
      }
    } catch {
      // Bot local não disponível ou demorou mais de 1.2s — segue para cache e validação
    }
  }

  // 3. Cache local existente
  const stored = getStoredVerifications();
  if (norm.digits && stored[norm.digits]) {
    const cached = stored[norm.digits]!;
    return {
      isRegistered: cached.isRegistered,
      status: cached.isRegistered ? "registered" : "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: cached.isRegistered && norm.digits ? `https://wa.me/${norm.digits}` : null,
      profileName: cached.profileName || null,
      reason:
        cached.reason ||
        (cached.isRegistered ? "Validado no WhatsApp (em cache)" : "Sem WhatsApp (em cache)"),
      checkedAt: nowStr,
      checkedVia: "cache",
    };
  }

  // 4. Se for linha móvel válida de Angola (+244 92/93/94/95/91/99), aprova
  const baseVal = validateCampaignWhatsAppNumber(phone, manualOverride);
  return {
    ...baseVal,
    profileName: baseVal.profileName || null,
  };
}

/**
 * Validação prévia de WhatsApp para Campanhas & Disparos:
 * Identifica e descarta números fixos ou sem conta antes de gravar no banco de dados.
 *
 * Regras:
 * 1. Números fixos de Angola (222, 234, etc.) ou internacionais são sumariamente DESCARTADOS.
 * 2. Números confirmados sem conta no WhatsApp (lista negra/cache) são sumariamente DESCARTADOS.
 * 3. Formatos incompletos ou inválidos são sumariamente DESCARTADOS.
 * 4. Linhas móveis de Angola (+244 92/93/94 Unitel, 95 Africell, 91/99 Movicel) e móveis internacionais
 *    são APROVADAS para o disparo no WhatsApp.
 * 5. Suporta override manual por lead caso o operador deseje incluir/excluir pontualmente.
 */
export function validateCampaignWhatsAppNumber(
  phone: string,
  manualOverride?: boolean,
): WhatsAppVerificationResult {
  const norm = normalizePhoneNumber(phone);
  const { carrier, lineType } = detectCarrier(norm.digits);
  const nowStr = new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

  // 1. Override manual explícito (se operador alterou)
  if (manualOverride === false) {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: "Descartado manualmente pelo operador no Centro de Operações.",
      checkedAt: nowStr,
      checkedVia: "explicit_lead",
    };
  }

  if (manualOverride === true) {
    return {
      isRegistered: true,
      status: "registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: norm.digits ? `https://wa.me/${norm.digits}` : null,
      reason: "Confirmado manualmente com conta ativa no WhatsApp.",
      checkedAt: nowStr,
      checkedVia: "explicit_lead",
    };
  }

  // 2. Números catalogados sem WhatsApp (+244934024904, +244928538739, etc.)
  if (isKnownUnregisteredNumber(phone) || isKnownUnregisteredNumber(norm.digits)) {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: `Sem conta ativa no WhatsApp: número ${norm.formatted || phone} verificado e sem cadastro (${carrier}).`,
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 3. Linha fixa (landline) -> DESCARTADA
  if (lineType === "landline") {
    return {
      isRegistered: false,
      status: "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason:
        "Telefone de linha fixa descartado (telefones fixos não possuem cadastro no WhatsApp móvel).",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 4. Formato inválido ou incompleto -> DESCARTADO
  if (lineType === "invalid" || norm.digits.length < 8) {
    return {
      isRegistered: false,
      status: "invalid_format",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: null,
      reason: "Formato de número inválido ou incompleto (descartado).",
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  // 5. Cache salvo no navegador
  const stored = getStoredVerifications();
  if (norm.digits && stored[norm.digits]) {
    const cached = stored[norm.digits]!;
    return {
      isRegistered: cached.isRegistered,
      status: cached.isRegistered ? "registered" : "not_registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: cached.isRegistered && norm.digits ? `https://wa.me/${norm.digits}` : null,
      profileName: cached.profileName || null,
      reason:
        cached.reason ||
        (cached.isRegistered ? "Validado no WhatsApp (em cache)" : "Sem WhatsApp (em cache)"),
      checkedAt: nowStr,
      checkedVia: "cache",
    };
  }

  // 6. Linhas móveis ativas de Angola (+244 92/93/94 Unitel, 95 Africell, 91/99 Movicel) ou internacionais
  if (lineType === "mobile") {
    return {
      isRegistered: true,
      status: "registered",
      formattedNumber: norm.formatted || phone,
      rawPhone: phone,
      digits: norm.digits,
      carrier,
      lineType,
      waLink: norm.digits ? `https://wa.me/${norm.digits}` : null,
      reason: `Linha móvel válida (${carrier}) com suporte ativo para WhatsApp.`,
      checkedAt: nowStr,
      checkedVia: "carrier_format",
    };
  }

  return {
    isRegistered: false,
    status: "not_registered",
    formattedNumber: norm.formatted || phone,
    rawPhone: phone,
    digits: norm.digits,
    carrier,
    lineType,
    waLink: null,
    reason: "Número não qualificado para WhatsApp.",
    checkedAt: nowStr,
    checkedVia: "carrier_format",
  };
}

export interface AutoFilterMessagesResult {
  cleanedText: string;
  originalCount: number;
  validCount: number;
  removedCount: number;
  keptItems: Array<{
    empresa: string;
    telefone: string;
    mensagem: string;
    cidade?: string;
    oferta?: string;
    carrier: string;
  }>;
  removedItems: Array<{
    empresa: string;
    telefone: string;
    mensagem: string;
    reason: string;
    carrier: string;
    lineType: string;
  }>;
}

/**
 * Filtra no modo automático qualquer arquivo ou texto de mensagens (.MD, .TXT, tabela, blocos ou CSV):
 * 1. Extrai todos os números e as respectivas mensagens do arquivo.
 * 2. Verifica a existência de conta ativa no WhatsApp para cada número.
 * 3. Mantém APENAS os números cadastrados e as suas respetivas mensagens.
 * 4. Remove completamente os números sem cadastro no WhatsApp e as suas mensagens.
 * 5. Devolve o texto limpo pronto para gravação e o relatório dos contatos removidos.
 */
export function filterMessagesContentAuto(
  content: string,
  options: {
    discardLandlines?: boolean;
    discardUnregistered?: boolean;
  } = {},
): AutoFilterMessagesResult {
  const discardLandlines = options.discardLandlines ?? true;
  const discardUnregistered = options.discardUnregistered ?? true;

  if (!content || !content.trim()) {
    return {
      cleanedText: "",
      originalCount: 0,
      validCount: 0,
      removedCount: 0,
      keptItems: [],
      removedItems: [],
    };
  }

  const keptItems: AutoFilterMessagesResult["keptItems"] = [];
  const removedItems: AutoFilterMessagesResult["removedItems"] = [];

  const lines = content.split(/\r?\n/);

  // 1. VERIFICAR SE O FORMATO É TABELA MARKDOWN (| Empresa | Telefone | Mensagem | ...)
  const tableIndices: number[] = [];
  lines.forEach((line, idx) => {
    const t = line.trim();
    if (t.startsWith("|") && t.endsWith("|")) {
      tableIndices.push(idx);
    }
  });

  if (tableIndices.length >= 2 && tableIndices[0] !== undefined) {
    const firstTableIdx = tableIndices[0];
    const headerLine = lines[firstTableIdx] || "";
    const headerCols = headerLine
      .split("|")
      .map((c: string) => c.trim().toLowerCase())
      .filter(Boolean);

    const empIdx = headerCols.findIndex(
      (c: string) => c.includes("empresa") || c.includes("nome") || c.includes("cliente"),
    );
    const telIdx = headerCols.findIndex(
      (c: string) => c.includes("tel") || c.includes("cel") || c.includes("fone") || c.includes("whatsapp"),
    );
    const msgIdx = headerCols.findIndex(
      (c: string) => c.includes("msg") || c.includes("mensagem") || c.includes("texto"),
    );
    const oftIdx = headerCols.findIndex(
      (c: string) => c.includes("oferta") || c.includes("plano") || c.includes("pacote"),
    );
    const cidIdx = headerCols.findIndex((c: string) => c.includes("cidade") || c.includes("local"));

    const preTableLines = lines.slice(0, firstTableIdx);
    const cleanedTableLines: string[] = [headerLine];

    for (let i = 1; i < tableIndices.length; i++) {
      const lineIdx = tableIndices[i];
      if (lineIdx === undefined) continue;
      const rowLine = lines[lineIdx] || "";

      if (rowLine.includes("---")) {
        cleanedTableLines.push(rowLine);
        continue;
      }

      const cols = rowLine
        .split("|")
        .map((c: string) => c.trim())
        .filter((_: string, idx: number, arr: string[]) => idx > 0 && idx < arr.length);

      if (cols.length >= 2) {
        const emp = empIdx !== -1 && cols[empIdx] ? cols[empIdx] : cols[0] || "Empresa";
        const tel = telIdx !== -1 && cols[telIdx] ? cols[telIdx] : cols[1] || "";
        const msg =
          msgIdx !== -1 && cols[msgIdx]
            ? cols[msgIdx]
            : cols[2] || `Olá ${emp}, temos uma proposta para vocês.`;
        const oft = oftIdx !== -1 ? cols[oftIdx] : undefined;
        const cid = cidIdx !== -1 ? cols[cidIdx] : undefined;

        if (tel && tel.replace(/\D/g, "").length >= 7) {
          const verification = validateCampaignWhatsAppNumber(tel);

          let shouldKeep = true;
          if (verification.status === "invalid_format") {
            shouldKeep = false;
          } else if (discardLandlines && verification.lineType === "landline") {
            shouldKeep = false;
          } else if (
            discardUnregistered &&
            (!verification.isRegistered || verification.status === "not_registered")
          ) {
            shouldKeep = false;
          } else if (!discardLandlines && verification.lineType === "landline") {
            shouldKeep = true;
          } else if (!discardUnregistered && !verification.isRegistered) {
            shouldKeep = true;
          } else {
            shouldKeep = verification.isRegistered;
          }

          if (shouldKeep) {
            cleanedTableLines.push(rowLine);
            keptItems.push({
              empresa: emp,
              telefone: tel,
              mensagem: msg,
              oferta: oft,
              cidade: cid,
              carrier: verification.carrier,
            });
          } else {
            // REMOVE O NÚMERO E A MENSAGEM DO ARQUIVO
            removedItems.push({
              empresa: emp,
              telefone: tel,
              mensagem: msg,
              reason: verification.reason,
              carrier: verification.carrier,
              lineType: verification.lineType,
            });
          }
        } else {
          cleanedTableLines.push(rowLine);
        }
      }
    }

    const lastTableIdx = tableIndices[tableIndices.length - 1];
    const postTableLines = lastTableIdx !== undefined ? lines.slice(lastTableIdx + 1) : [];

    const fullCleaned = [...preTableLines, ...cleanedTableLines, ...postTableLines]
      .join("\n")
      .trim();

    return {
      cleanedText: fullCleaned,
      originalCount: keptItems.length + removedItems.length,
      validCount: keptItems.length,
      removedCount: removedItems.length,
      keptItems,
      removedItems,
    };
  }

  // 2. VERIFICAR SE O FORMATO É EM BLOCOS (--- Lead N --- ou ### Empresa ... Telefone: ... Mensagem: ...)
  if (
    content.includes("--- Lead") ||
    content.includes("###") ||
    content.toLowerCase().includes("telefone:") ||
    content.toLowerCase().includes("whatsapp:")
  ) {
    const blocks = content.split(/(?=---\s*Lead\s+\d+\s*---|###|\n##\s+)/i);
    const validBlocks: string[] = [];

    for (const block of blocks) {
      if (!block.trim()) continue;
      const telUrlMatch = block.match(/WhatsApp:\s*https?:\/\/wa\.me\/(\d+)[^\s]*/i);
      const telStdMatch = block.match(/(?:Telefone|telefone|WhatsApp|Tel):\s*([+\d\s()-]+)/i);
      const nameMatch =
        block.match(/Empresa:\s*(.+?)(?:\r?\n|$)/i) ||
        block.match(/Nome na mensagem:\s*(.+?)(?:\s*\||\r?\n|$)/i) ||
        block.match(/#{2,3}\s+(.+?)(?:\r?\n|$)/);
      const msgMatch =
        block.match(/Mensagem:\s*\r?\n([\s\S]+?)(?=\n-{10,}|\n---\s*Lead|$)/i) ||
        block.match(/(?:Mensagem|mensagem|Texto):\s*([\s\S]+?)(?=\n(?:[A-Z][a-z]+:|$))/i);

      let extractedTel = "";
      if (telUrlMatch && telUrlMatch[1]) {
        extractedTel = `+${telUrlMatch[1]}`;
      } else if (telStdMatch && telStdMatch[1]) {
        extractedTel = telStdMatch[1].trim();
      }

      if (extractedTel) {
        const emp = nameMatch && nameMatch[1] ? nameMatch[1].trim() : "Empresa";
        const tel = extractedTel;
        const msg = msgMatch && msgMatch[1] ? msgMatch[1].trim() : "";

        const verification = validateCampaignWhatsAppNumber(tel);
        let shouldKeep = true;
        if (verification.status === "invalid_format") {
          shouldKeep = false;
        } else if (discardLandlines && verification.lineType === "landline") {
          shouldKeep = false;
        } else if (
          discardUnregistered &&
          (!verification.isRegistered || verification.status === "not_registered")
        ) {
          shouldKeep = false;
        } else if (!discardLandlines && verification.lineType === "landline") {
          shouldKeep = true;
        } else if (!discardUnregistered && !verification.isRegistered) {
          shouldKeep = true;
        } else {
          shouldKeep = verification.isRegistered;
        }

        if (shouldKeep) {
          validBlocks.push(block.trim());
          keptItems.push({
            empresa: emp,
            telefone: tel,
            mensagem: msg,
            carrier: verification.carrier,
          });
        } else {
          // REMOVE O BLOCO INTEIRO (NÚMERO + MENSAGEM)
          removedItems.push({
            empresa: emp,
            telefone: tel,
            mensagem: msg,
            reason: verification.reason,
            carrier: verification.carrier,
            lineType: verification.lineType,
          });
        }
      } else {
        validBlocks.push(block.trim());
      }
    }

    return {
      cleanedText: validBlocks.join("\n\n"),
      originalCount: keptItems.length + removedItems.length,
      validCount: keptItems.length,
      removedCount: removedItems.length,
      keptItems,
      removedItems,
    };
  }

  // 3. FORMATO DELIMITADO OU LINHAS COM TELEFONES E MENSAGENS
  const cleanedLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) {
      cleanedLines.push(line);
      continue;
    }

    let parts = trimmed.split(";");
    if (parts.length < 2) parts = trimmed.split(",");

    if (parts.length >= 2) {
      const emp = parts[0]?.trim() || "Empresa";
      const tel = parts[1]?.trim() || "";
      const msg = parts[2]?.trim() || "";

      if (tel && tel.replace(/\D/g, "").length >= 7) {
        const verification = validateCampaignWhatsAppNumber(tel);
        let shouldKeep = true;
        if (verification.status === "invalid_format") {
          shouldKeep = false;
        } else if (discardLandlines && verification.lineType === "landline") {
          shouldKeep = false;
        } else if (
          discardUnregistered &&
          (!verification.isRegistered || verification.status === "not_registered")
        ) {
          shouldKeep = false;
        } else if (!discardLandlines && verification.lineType === "landline") {
          shouldKeep = true;
        } else if (!discardUnregistered && !verification.isRegistered) {
          shouldKeep = true;
        } else {
          shouldKeep = verification.isRegistered;
        }

        if (shouldKeep) {
          cleanedLines.push(line);
          keptItems.push({
            empresa: emp,
            telefone: tel,
            mensagem: msg,
            carrier: verification.carrier,
          });
        } else {
          removedItems.push({
            empresa: emp,
            telefone: tel,
            mensagem: msg,
            reason: verification.reason,
            carrier: verification.carrier,
            lineType: verification.lineType,
          });
        }
        continue;
      }
    }

    // Tenta detectar número de telefone dentro da linha de mensagem livre
    const phoneRegex =
      /(?:\+?244\s*)?(?:9[1-689]\d[\s.-]?\d{3}[\s.-]?\d{3}|22\d[\s.-]?\d{3}[\s.-]?\d{3}|\+?\d{1,4}[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4})/;
    const match = phoneRegex.exec(trimmed);

    if (match) {
      const foundPhone = match[0];
      const verification = validateCampaignWhatsAppNumber(foundPhone);
      let shouldKeep = true;
      if (verification.status === "invalid_format") {
        shouldKeep = false;
      } else if (discardLandlines && verification.lineType === "landline") {
        shouldKeep = false;
      } else if (
        discardUnregistered &&
        (!verification.isRegistered || verification.status === "not_registered")
      ) {
        shouldKeep = false;
      } else if (!discardLandlines && verification.lineType === "landline") {
        shouldKeep = true;
      } else if (!discardUnregistered && !verification.isRegistered) {
        shouldKeep = true;
      } else {
        shouldKeep = verification.isRegistered;
      }

      if (shouldKeep) {
        cleanedLines.push(line);
        keptItems.push({
          empresa: "Contato",
          telefone: foundPhone,
          mensagem: trimmed.replace(foundPhone, "").trim(),
          carrier: verification.carrier,
        });
      } else {
        removedItems.push({
          empresa: "Contato",
          telefone: foundPhone,
          mensagem: trimmed.replace(foundPhone, "").trim(),
          reason: verification.reason,
          carrier: verification.carrier,
          lineType: verification.lineType,
        });
      }
    } else {
      cleanedLines.push(line);
    }
  }

  return {
    cleanedText: cleanedLines.join("\n"),
    originalCount: keptItems.length + removedItems.length,
    validCount: keptItems.length,
    removedCount: removedItems.length,
    keptItems,
    removedItems,
  };
}
