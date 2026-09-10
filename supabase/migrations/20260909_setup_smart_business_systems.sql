-- ==============================================================================
-- SMART BUSINESS SYSTEMS (AGENTES DIGITAL) - SUPABASE SCHEMA DEFINITION
-- ==============================================================================
-- Este script cria todas as tabelas normalizadas onde cada campo do formulário 
-- possui a sua respectiva tabela, com integridade referencial, view consolidada,
-- políticas de RLS e dados iniciais de demonstração para o Centro de Operações.
-- ==============================================================================

-- 1. Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABELAS PRINCIPAIS E CAMPOS DO FORMULÁRIO
-- ==============================================================================

-- Tabela Mestre: Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel TEXT NOT NULL DEFAULT 'website', -- 'website', 'whatsapp', 'google', 'email'
    status TEXT NOT NULL DEFAULT 'novo', -- 'novo', 'qualificado', 'agendado', 'convertido', 'perdido'
    package_interest TEXT NOT NULL DEFAULT 'Profissional', -- 'Presença', 'Profissional', 'Autoridade', 'Domínio IA'
    ai_qualified BOOLEAN NOT NULL DEFAULT false,
    qualification_score INTEGER NOT NULL DEFAULT 50, -- 0 a 100
    estimated_value TEXT NOT NULL DEFAULT 'Kz 250.000',
    ai_processing_status TEXT NOT NULL DEFAULT 'ativo', -- 'ativo', 'escalado', 'concluido'
    unread_messages_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Nome do Contacto
CREATE TABLE IF NOT EXISTS public.lead_nomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    nome_completo TEXT NOT NULL,
    cargo TEXT DEFAULT 'Responsável Comercial',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Empresa
CREATE TABLE IF NOT EXISTS public.lead_empresas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    nome_empresa TEXT NOT NULL,
    localizacao TEXT DEFAULT 'Angola',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Telefone / WhatsApp
CREATE TABLE IF NOT EXISTS public.lead_telefones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    numero_telefone TEXT NOT NULL,
    e_whatsapp BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: E-mail
CREATE TABLE IF NOT EXISTS public.lead_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    endereco_email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Área de Atuação da Empresa
CREATE TABLE IF NOT EXISTS public.lead_areas_atuacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    area_atuacao TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Serviço Pretendido
CREATE TABLE IF NOT EXISTS public.lead_servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    servico_pretendido TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Campo do formulário: Mensagem
CREATE TABLE IF NOT EXISTS public.lead_mensagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    conteudo_mensagem TEXT NOT NULL,
    enviado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. TABELAS OPERACIONAIS (CENTRO DE OPERAÇÕES)
-- ==============================================================================

-- Notas Internas do Lead
CREATE TABLE IF NOT EXISTS public.lead_notas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    autor TEXT NOT NULL DEFAULT 'Operador Comercial',
    texto TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Atividades e Linha do Tempo
CREATE TABLE IF NOT EXISTS public.lead_atividades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL DEFAULT 'capture', -- 'capture', 'ai_qualification', 'appointment', 'status_change', 'proposal', 'note'
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agendamentos e Diagnósticos
CREATE TABLE IF NOT EXISTS public.lead_agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'Diagnóstico Estratégico',
    data_hora TIMESTAMPTZ NOT NULL DEFAULT now(),
    data_formatada TEXT,
    hora_formatada TEXT,
    status TEXT NOT NULL DEFAULT 'Confirmado', -- 'Confirmado', 'Pendente', 'Realizado'
    meet_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversas (Chat Cliente / IA / Humano)
CREATE TABLE IF NOT EXISTS public.lead_conversas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    remetente TEXT NOT NULL DEFAULT 'client', -- 'client', 'ai', 'human'
    texto TEXT NOT NULL,
    timestamp_formatado TEXT NOT NULL,
    sentimento TEXT DEFAULT 'neutral', -- 'positive', 'neutral', 'urgent'
    ai_metadata JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 4. ÍNDICES DE PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_nomes_lead_id ON public.lead_nomes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_empresas_lead_id ON public.lead_empresas(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_telefones_lead_id ON public.lead_telefones(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_emails_lead_id ON public.lead_emails(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_areas_lead_id ON public.lead_areas_atuacao(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_servicos_lead_id ON public.lead_servicos(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_mensagens_lead_id ON public.lead_mensagens(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notas_lead_id ON public.lead_notas(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_atividades_lead_id ON public.lead_atividades(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_agendamentos_lead_id ON public.lead_agendamentos(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_conversas_lead_id ON public.lead_conversas(lead_id);

-- ==============================================================================
-- 5. VIEW CONSOLIDADA: view_leads_completo
-- ==============================================================================
CREATE OR REPLACE VIEW public.view_leads_completo AS
SELECT 
    l.id,
    COALESCE(n.nome_completo, 'Contacto sem nome') AS name,
    COALESCE(e.nome_empresa, 'Empresa a confirmar') AS company,
    COALESCE(n.cargo, 'Responsável Comercial') AS role,
    COALESCE(t.numero_telefone, '') AS phone,
    COALESCE(m_email.endereco_email, '') AS email,
    COALESCE(e.localizacao, 'Angola') AS location,
    l.channel,
    l.status,
    l.package_interest AS "packageInterest",
    l.ai_qualified AS "aiQualified",
    l.qualification_score AS "qualificationScore",
    l.estimated_value AS "estimatedValue",
    l.ai_processing_status AS "aiProcessingStatus",
    l.unread_messages_count AS "unreadMessagesCount",
    l.created_at AS "createdAt",
    l.updated_at AS "updatedAt",
    COALESCE(a.area_atuacao, '') AS "areaAtuacao",
    COALESCE(s.servico_pretendido, '') AS "servicoPretendido",
    COALESCE(msg.conteudo_mensagem, '') AS "mensagemInicial",
    -- Agregação de Notas
    COALESCE((
        SELECT json_agg(json_build_object(
            'id', ln.id,
            'author', ln.autor,
            'text', ln.texto,
            'createdAt', to_char(ln.created_at, 'DD/MM/YYYY HH24:MI')
        ) ORDER BY ln.created_at DESC)
        FROM public.lead_notas ln WHERE ln.lead_id = l.id
    ), '[]'::json) AS notes,
    -- Agregação de Atividades
    COALESCE((
        SELECT json_agg(json_build_object(
            'id', la.id,
            'type', la.tipo,
            'title', la.titulo,
            'description', la.descricao,
            'timestamp', to_char(la.created_at, 'DD/MM/YYYY HH24:MI')
        ) ORDER BY la.created_at DESC)
        FROM public.lead_atividades la WHERE la.lead_id = l.id
    ), '[]'::json) AS activities,
    -- Agregação de Agendamentos
    COALESCE((
        SELECT json_agg(json_build_object(
            'id', lg.id,
            'title', lg.titulo,
            'type', lg.tipo,
            'dateTime', lg.data_hora,
            'dateFormatted', COALESCE(lg.data_formatada, to_char(lg.data_hora, 'DD Mon, YYYY')),
            'timeFormatted', COALESCE(lg.hora_formatada, to_char(lg.data_hora, 'HH24:MI')),
            'status', lg.status,
            'meetUrl', lg.meet_url
        ) ORDER BY lg.data_hora ASC)
        FROM public.lead_agendamentos lg WHERE lg.lead_id = l.id
    ), '[]'::json) AS appointments,
    -- Agregação de Conversas
    COALESCE((
        SELECT json_agg(json_build_object(
            'id', lc.id,
            'sender', lc.remetente,
            'text', lc.texto,
            'timestamp', lc.timestamp_formatado,
            'sentiment', lc.sentimento,
            'aiMetadata', lc.ai_metadata
        ) ORDER BY lc.created_at ASC)
        FROM public.lead_conversas lc WHERE lc.lead_id = l.id
    ), '[]'::json) AS conversation
FROM public.leads l
LEFT JOIN LATERAL (SELECT nome_completo, cargo FROM public.lead_nomes WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) n ON true
LEFT JOIN LATERAL (SELECT nome_empresa, localizacao FROM public.lead_empresas WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) e ON true
LEFT JOIN LATERAL (SELECT numero_telefone FROM public.lead_telefones WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) t ON true
LEFT JOIN LATERAL (SELECT endereco_email FROM public.lead_emails WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) m_email ON true
LEFT JOIN LATERAL (SELECT area_atuacao FROM public.lead_areas_atuacao WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) a ON true
LEFT JOIN LATERAL (SELECT servico_pretendido FROM public.lead_servicos WHERE lead_id = l.id ORDER BY created_at DESC LIMIT 1) s ON true
LEFT JOIN LATERAL (SELECT conteudo_mensagem FROM public.lead_mensagens WHERE lead_id = l.id ORDER BY enviado_em DESC LIMIT 1) msg ON true;

-- ==============================================================================
-- 6. POLÍTICAS DE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_nomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_telefones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_areas_atuacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_atividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_conversas ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'lead%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Acesso público irrestrito leitura" ON public.%I;', tbl);
        EXECUTE format('CREATE POLICY "Acesso público irrestrito leitura" ON public.%I FOR SELECT USING (true);', tbl);

        EXECUTE format('DROP POLICY IF EXISTS "Acesso público irrestrito insercao" ON public.%I;', tbl);
        EXECUTE format('CREATE POLICY "Acesso público irrestrito insercao" ON public.%I FOR INSERT WITH CHECK (true);', tbl);

        EXECUTE format('DROP POLICY IF EXISTS "Acesso público irrestrito atualizacao" ON public.%I;', tbl);
        EXECUTE format('CREATE POLICY "Acesso público irrestrito atualizacao" ON public.%I FOR UPDATE USING (true) WITH CHECK (true);', tbl);

        EXECUTE format('DROP POLICY IF EXISTS "Acesso público irrestrito remocao" ON public.%I;', tbl);
        EXECUTE format('CREATE POLICY "Acesso público irrestrito remocao" ON public.%I FOR DELETE USING (true);', tbl);
    END LOOP;
END $$;

-- ==============================================================================
-- 7. FUNÇÃO TRANSACIONAL PARA REGISTO DO FORMULÁRIO (RPC)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.cadastrar_lead_formulario(
    p_nome TEXT,
    p_empresa TEXT,
    p_telefone TEXT,
    p_email TEXT,
    p_area_atuacao TEXT,
    p_servico TEXT,
    p_mensagem TEXT,
    p_canal TEXT DEFAULT 'website'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_lead_id UUID;
    v_package TEXT;
    v_estimated_value TEXT;
    v_score INTEGER;
BEGIN
    -- Mapeamento do serviço para o pacote
    IF p_servico ILIKE '%Agente%' OR p_servico ILIKE '%IA%' THEN
        v_package := 'Domínio IA';
        v_estimated_value := 'Kz 700.000';
        v_score := 85;
    ELSIF p_servico ILIKE '%Automação%' THEN
        v_package := 'Autoridade';
        v_estimated_value := 'Kz 450.000';
        v_score := 80;
    ELSIF p_servico ILIKE '%Sistema%' THEN
        v_package := 'Domínio IA';
        v_estimated_value := 'Kz 700.000';
        v_score := 90;
    ELSE
        v_package := 'Profissional';
        v_estimated_value := 'Kz 250.000';
        v_score := 75;
    END IF;

    -- 1. Inserir na tabela mestre `leads`
    INSERT INTO public.leads (
        channel,
        status,
        package_interest,
        ai_qualified,
        qualification_score,
        estimated_value,
        ai_processing_status
    ) VALUES (
        COALESCE(p_canal, 'website'),
        'novo',
        v_package,
        true,
        v_score,
        v_estimated_value,
        'ativo'
    ) RETURNING id INTO v_lead_id;

    -- 2. Inserir nas tabelas específicas de cada campo
    INSERT INTO public.lead_nomes (lead_id, nome_completo, cargo)
    VALUES (v_lead_id, p_nome, 'Responsável Comercial');

    INSERT INTO public.lead_empresas (lead_id, nome_empresa, localizacao)
    VALUES (v_lead_id, p_empresa, 'Angola');

    INSERT INTO public.lead_telefones (lead_id, numero_telefone, e_whatsapp)
    VALUES (v_lead_id, p_telefone, true);

    INSERT INTO public.lead_emails (lead_id, endereco_email)
    VALUES (v_lead_id, p_email);

    INSERT INTO public.lead_areas_atuacao (lead_id, area_atuacao)
    VALUES (v_lead_id, p_area_atuacao);

    INSERT INTO public.lead_servicos (lead_id, servico_pretendido)
    VALUES (v_lead_id, p_servico);

    INSERT INTO public.lead_mensagens (lead_id, conteudo_mensagem)
    VALUES (v_lead_id, p_mensagem);

    -- 3. Inserir atividade inicial de captura
    INSERT INTO public.lead_atividades (lead_id, tipo, titulo, descricao)
    VALUES (
        v_lead_id,
        'capture',
        'Lead capturado no website',
        format('Pedido de proposta para o serviço "%s" enviado por %s (%s).', p_servico, p_nome, p_empresa)
    );

    -- 4. Inserir conversa inicial
    INSERT INTO public.lead_conversas (
        lead_id,
        remetente,
        texto,
        timestamp_formatado,
        sentimento
    ) VALUES (
        v_lead_id,
        'client',
        format('Olá! Enviei um pedido pelo formulário do site. Empresa: %s. Área: %s. Serviço: %s. Mensagem: %s', p_empresa, p_area_atuacao, p_servico, p_mensagem),
        to_char(now(), 'HH24:MI'),
        'positive'
    );

    -- 5. Inserir resposta do Agente IA inicial
    INSERT INTO public.lead_conversas (
        lead_id,
        remetente,
        texto,
        timestamp_formatado,
        sentimento
    ) VALUES (
        v_lead_id,
        'ai',
        format('Olá %s! Recebemos a sua solicitação para %s. O nosso Agente de IA já analisou o perfil da sua empresa (%s) e os nossos especialistas comerciais irão entrar em contacto brevemente pelo WhatsApp.', p_nome, p_servico, p_empresa),
        to_char(now(), 'HH24:MI'),
        'positive'
    );

    RETURN v_lead_id;
END;
$$;

-- ==============================================================================
-- 8. HABILITAR REALTIME NO SUPABASE
-- ==============================================================================
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_atividades;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_notas;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_conversas;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.lead_agendamentos;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END $$;
