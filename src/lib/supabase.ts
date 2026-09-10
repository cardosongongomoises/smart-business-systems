import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Configurações oficiais do Supabase para o Smart Business Systems
const DEFAULT_SUPABASE_URL = "https://kwpmcaxxnercxhxlwdbt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_cehoCv6ol2RsIYDtpajm8A_mln5GTqg";

// Variáveis de ambiente configuradas no .env ou na Vercel (com fallback para produção)
const supabaseUrl =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined) || DEFAULT_SUPABASE_ANON_KEY;

/**
 * Verifica se as credenciais do Supabase foram preenchidas no .env
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim() !== "" &&
    supabaseAnonKey.trim() !== "" &&
    !supabaseUrl.includes("seu-projeto") &&
    !supabaseUrl.includes("your-project"),
  );
}

// Inicializa o cliente apenas se configurado, ou usa um fallback seguro
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : createClient(
      "https://placeholder.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder",
    );

export const SUPABASE_STATUS = {
  isConfigured: isSupabaseConfigured(),
  url: supabaseUrl || null,
};
