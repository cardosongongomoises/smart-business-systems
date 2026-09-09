import { useState } from "react";
import {
  Code2,
  Bot,
  Sparkles,
  Play,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SYSTEM_PROMPT_CONTENT, generateAIAgentResponse } from "./aiAgentEngine";
import { Lead, AIStructuredOutput } from "./types";
import { toast } from "sonner";

interface SystemPromptViewProps {
  currentLead: Lead | null;
}

export function SystemPromptView({ currentLead }: SystemPromptViewProps) {
  const [copied, setCopied] = useState(false);
  const [sandboxInput, setSandboxInput] = useState(
    "Boa tarde! Tenho uma clínica no Talatona e perdemos muitas consultas à noite no WhatsApp.",
  );
  const [testResult, setTestResult] = useState<{
    reply: string;
    json: AIStructuredOutput;
    ruleTriggered: string;
  } | null>(null);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT_CONTENT);
    setCopied(true);
    toast.success("Prompt de Sistema copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSandbox = () => {
    const fallbackLead: Lead = currentLead || {
      id: "test-lead",
      name: "Dra. Teste",
      company: "Clínica Teste",
      role: "Diretora",
      phone: "+244 923 000 000",
      email: "teste@clinica.ao",
      channel: "whatsapp",
      status: "novo",
      packageInterest: "Domínio IA",
      aiQualified: true,
      qualificationScore: 80,
      estimatedValue: "Kz 700.000",
      firstContactAt: "Agora",
      lastActive: "Agora",
      notes: [],
      activities: [],
      appointments: [],
      conversation: [],
      aiProcessingStatus: "ativo",
    };

    const res = generateAIAgentResponse(sandboxInput, [], fallbackLead);

    let rule = "Regras Gerais de Qualificação & Tom de Voz Angolano";
    if (res.metadata.escalate_to_human) {
      rule = "Regra 7: Escalonamento Imediato para Humano (↗ ATENDENTE)";
    } else if (res.metadata.ai_intent === "agendamento") {
      rule = "Regra 6: Proposta de 2 horários concretos sem perguntas abertas";
    } else if (sandboxInput.toLowerCase().includes("preço")) {
      rule = "Regra 3: Tabela oficial dos 4 pacotes em Kwanzas (Kz)";
    }

    setTestResult({
      reply: res.replyText,
      json: res.metadata,
      ruleTriggered: rule,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080A0F] p-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-[10px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
              <Bot className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#F5F7FA]">
                  Prompt de Sistema do Agente Digital
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC] border border-[#8B5CF6]/40">
                  v3.2 Production
                </span>
              </div>
              <p className="text-xs text-[#A7B0BF] mt-0.5">
                Diretriz de inteligência, regras de negócio e telemetria estruturada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-[#252C38] bg-[#0E121A] text-xs font-semibold text-[#F5F7FA] hover:border-[#8B5CF6] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-[#22C55E]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[#A7B0BF]" />
                  <span>Copiar System Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#252C38] text-xs">
          <div>
            <span className="text-[#667085] block text-[11px]">Tokens de Contexto</span>
            <span className="font-mono font-bold text-[#F5F7FA]">~842 tokens</span>
          </div>
          <div>
            <span className="text-[#667085] block text-[11px]">Modelo Alvo</span>
            <span className="font-mono font-bold text-[#3B82F6]">Claude 3.5 / Gemini Flash</span>
          </div>
          <div>
            <span className="text-[#667085] block text-[11px]">Regras Rígidas</span>
            <span className="font-mono font-bold text-[#22C55E]">8 Guardrails Ativos</span>
          </div>
          <div>
            <span className="text-[#667085] block text-[11px]">Extração Estruturada</span>
            <span className="font-mono font-bold text-[#8B5CF6]">JSON Schema v2</span>
          </div>
        </div>
      </div>

      {/* 4 Packages Reference in Kwanzas */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-sm">
        <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="size-4 text-[#3B82F6]" />
          Base de Conhecimento: Tabela Oficial de Pacotes (Kwanzas)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-[12px] border border-[#252C38] bg-[#0E121A]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F5F7FA]">Presença</span>
              <span className="text-[10px] text-[#667085]">Inicial</span>
            </div>
            <p className="text-base font-extrabold text-[#3B82F6] mt-2 font-mono">Kz 125.000</p>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5 font-mono">+ Kz 20.000/mês</p>
            <p className="text-[11px] text-[#667085] mt-2">
              Landing page, domínio, hospedagem, WhatsApp e Google Maps.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] border border-[#3B82F6]/40 bg-[#3B82F6]/5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#3B82F6]">Profissional ⭐</span>
              <span className="text-[10px] font-semibold text-[#3B82F6]">Mais escolhido</span>
            </div>
            <p className="text-base font-extrabold text-[#F5F7FA] mt-2 font-mono">Kz 250.000</p>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5 font-mono">+ Kz 50.000/mês</p>
            <p className="text-[11px] text-[#667085] mt-2">
              Website até 5 páginas + agendamento + IA básica + SEO local.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] border border-[#252C38] bg-[#0E121A]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F5F7FA]">Autoridade</span>
              <span className="text-[10px] text-[#8B5CF6]">Corporativo</span>
            </div>
            <p className="text-base font-extrabold text-[#8B5CF6] mt-2 font-mono">Kz 450.000</p>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5 font-mono">+ Kz 85.000/mês</p>
            <p className="text-[11px] text-[#667085] mt-2">
              Website até 10 páginas + blog + IA avançada + CRM + automação.
            </p>
          </div>

          <div className="p-3.5 rounded-[12px] border border-[#8B5CF6]/40 bg-[#8B5CF6]/5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#C084FC]">Domínio IA</span>
              <span className="text-[10px] font-semibold text-[#8B5CF6]">Total</span>
            </div>
            <p className="text-base font-extrabold text-[#F5F7FA] mt-2 font-mono">Kz 700.000</p>
            <p className="text-[11px] text-[#A7B0BF] mt-0.5 font-mono">+ Kz 150.000/mês</p>
            <p className="text-[11px] text-[#667085] mt-2">
              Sistemas personalizados, múltiplos agentes IA e dashboards.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox Simulator */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-4">
          <div className="flex items-center gap-2">
            <Play className="size-4 text-[#22C55E]" />
            <h3 className="text-sm font-bold text-[#F5F7FA]">
              Sandbox de Teste do Agente IA em Tempo Real
            </h3>
          </div>
          <span className="text-xs text-[#A7B0BF]">
            Simule mensagens de clientes e veja as respostas e o JSON estruturado
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              placeholder="Digite uma mensagem simulada do cliente..."
              className="flex-1 h-10 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
            />
            <button
              type="button"
              onClick={handleRunSandbox}
              className="px-4 h-10 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-sm"
            >
              <Sparkles className="size-3.5" />
              <span>Processar com Prompt</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
            <span className="text-[#667085] py-0.5">Testes rápidos:</span>
            <button
              type="button"
              onClick={() => {
                setSandboxInput("Boa tarde, gostaria de saber mais sobre o serviço.");
              }}
              className="px-2.5 py-0.5 rounded-[6px] bg-[#0E121A] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
            >
              Entrada Inicial
            </button>
            <button
              type="button"
              onClick={() => {
                setSandboxInput("Quanto custa o serviço?");
              }}
              className="px-2.5 py-0.5 rounded-[6px] bg-[#0E121A] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
            >
              Pergunta de Preço
            </button>
            <button
              type="button"
              onClick={() => {
                setSandboxInput("15h está bom.");
              }}
              className="px-2.5 py-0.5 rounded-[6px] bg-[#0E121A] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
            >
              Confirmar Agendamento
            </button>
            <button
              type="button"
              onClick={() => {
                setSandboxInput("Podem dar um desconto de 50%? Quero falar com uma pessoa.");
              }}
              className="px-2.5 py-0.5 rounded-[6px] bg-[#0E121A] border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10"
            >
              Teste de Escalonamento (Regra 7)
            </button>
          </div>

          {/* Output Inspection Card */}
          {testResult && (
            <div className="mt-4 rounded-[12px] border border-[#8B5CF6]/40 bg-[#0E121A] p-4 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#252C38]">
                <span className="text-[#C084FC] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" />
                  {testResult.ruleTriggered}
                </span>
                <span className="text-[10px] font-mono text-[#22C55E]">
                  200 OK • Confidence: {testResult.json.ai_confidence}
                </span>
              </div>

              {/* Natural Agent Message */}
              <div>
                <span className="text-[#667085] text-[10px] block mb-1">
                  Resposta do Agente Digital (WhatsApp):
                </span>
                <div className="rounded-[10px] border border-[#3B82F6]/30 bg-[#3B82F6]/10 p-3 text-[#F5F7FA] font-medium leading-relaxed">
                  {testResult.reply}
                </div>
              </div>

              {/* Structured JSON Payload */}
              <div>
                <span className="text-[#667085] text-[10px] block mb-1">
                  JSON Estruturado Extraído (Backend / Tabela Leads):
                </span>
                <pre className="rounded-[8px] bg-[#080A0F] border border-[#252C38] p-3 text-[11px] font-mono text-[#93C5FD] overflow-x-auto">
                  {JSON.stringify(testResult.json, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Raw System Prompt Display */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between pb-3 border-b border-[#252C38] mb-3">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-[#8B5CF6]" />
            <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
              Código Completo do System Prompt
            </h3>
          </div>
          <span className="text-[10px] text-[#667085] font-mono">
            Direct Claude / Gemini API Ready
          </span>
        </div>

        <pre className="rounded-[10px] border border-[#252C38] bg-[#080A0F] p-4 text-xs font-mono text-[#A7B0BF] overflow-x-auto leading-relaxed max-h-[400px]">
          {SYSTEM_PROMPT_CONTENT}
        </pre>
      </div>
    </div>
  );
}
