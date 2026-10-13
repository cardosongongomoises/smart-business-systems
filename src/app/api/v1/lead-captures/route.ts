import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Campos esperados vindo do WhatsApp bot
    const {
      from, // número WhatsApp do lead (ex.: "+244934545269")
      message, // mensagem enviada pelo lead
      timestamp, // data/hora em epoch ms
      name, // nome (se vier na payload)
      company, // empresa (sevier na payload)
    } = body;

    if (!from || !message) {
      return Response.json(
        { error: 'Campos obrigatórios "from" e "message" são necessários' },
        { status: 400 },
      );
    }

    // Inserir lead na tabela principal
    const { data, error } = await supabase
      .from("leads")
      .insert({
        channel: "whatsapp",
        status: "novo", // será qualificado pelo engine
        package_interest: "Profissional", // default - será atualizado após qualificação
        ai_qualified: false,
        qualification_score: 50, // score inicial
        estimated_value: "Kz 250.000",
        ai_processing_status: "ativo",
        // Campos adicionais que o engine lerá depois
        // (podem ser preenchidos depois pelo engine ou manualmente)
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Erro ao inserir lead no Supabase:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Inserir dados complementares nas tabelas específicas
    if (name) {
      await supabase.from("lead_nomes").insert({
        lead_id: data.id,
        nome_completo: name,
        cargo: "Responsável Comercial",
      });
    }

    if (company) {
      await supabase.from("lead_empresas").insert({
        lead_id: data.id,
        nome_empresa: company,
        localizacao: "Angola",
      });
    }

    // Inserir telefone/Whatsapp
    const phoneMatch = from.match(/[\d]+/g) || [];
    const phoneDigits = phoneMatch.join("");
    await supabase.from("lead_telefones").insert({
      lead_id: data.id,
      numero_telefone: phoneDigits,
      e_whatsapp: true,
    });

    // Inserir mensagem inicial na tabela de mensagens
    await supabase.from("lead_mensagens").insert({
      lead_id: data.id,
      conteudo_mensagem: message,
    });

    // Inserir atividade inicial
    await supabase.from("lead_atividades").insert({
      lead_id: data.id,
      tipo: "capture",
      titulo: "Lead capturado no WhatsApp",
      descricao: `Mensagem recebida de ${from} às ${new Date(timestamp).toLocaleString()}: "${message.substring(0, 80)}..."`,
    });

    // Inserir conversa inicial (cliente)
    await supabase.from("lead_conversas").insert({
      lead_id: data.id,
      remetente: "client",
      texto: message,
      timestamp_formatado: new Date(timestamp).toLocaleTimeString("pt-AO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sentimento: "neutral",
    });

    // Inserir resposta inicial do IA (placeholder)
    await supabase.from("lead_conversas").insert({
      lead_id: data.id,
      remetente: "ai",
      texto: `Olá! Recebemos a sua mensagem no WhatsApp. Nossa equipe entrará em contato brevemente para conhecer melhor o seu negócio e apresentar as melhores soluções Agentes Digital.`,
      timestamp_formatado: new Date(timestamp).toLocaleTimeString("pt-AO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sentimento: "positive",
    });

    return Response.json({
      success: true,
      leadId: data.id,
      qualificationScore: data.qualificationScore,
      status: data.status,
    });
  } catch (err) {
    console.error("❌ Erro inesperado no lead-captures:", err);
    return Response.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Endpoint público para listar leads (usado pelo dashboard/kanban)
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ leads: data });
}
