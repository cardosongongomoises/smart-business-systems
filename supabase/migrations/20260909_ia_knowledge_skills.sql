-- ==============================================================================
-- SMART BUSINESS SYSTEMS - BASE DE CONHECIMENTO & SKILLS DO VENDEDOR IA
-- ==============================================================================
-- Tabela para armazenar manuais de capacitação comercial e skills executáveis
-- no formato Markdown (.md) para o Agente de IA Vendedor.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.ia_vendedor_knowledge (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    filename TEXT NOT NULL, -- ex: 'skill-spin-selling-diagnostico.md'
    type TEXT NOT NULL DEFAULT 'skill', -- 'skill' (executável) ou 'manual' (capacitação)
    category TEXT NOT NULL DEFAULT 'qualificacao', -- 'qualificacao', 'objecoes', 'fechamento', 'rapport', 'negociacao'
    trigger_condition TEXT, -- quando a IA deve ativar esta skill
    content_md TEXT NOT NULL, -- conteúdo completo em formato Markdown (.md)
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_ia_vendedor_knowledge_type ON public.ia_vendedor_knowledge(type);
CREATE INDEX IF NOT EXISTS idx_ia_vendedor_knowledge_category ON public.ia_vendedor_knowledge(category);
CREATE INDEX IF NOT EXISTS idx_ia_vendedor_knowledge_active ON public.ia_vendedor_knowledge(is_active);

-- Row Level Security
ALTER TABLE public.ia_vendedor_knowledge ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso público irrestrito leitura knowledge" ON public.ia_vendedor_knowledge;
CREATE POLICY "Acesso público irrestrito leitura knowledge" ON public.ia_vendedor_knowledge FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso público irrestrito insercao knowledge" ON public.ia_vendedor_knowledge;
CREATE POLICY "Acesso público irrestrito insercao knowledge" ON public.ia_vendedor_knowledge FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso público irrestrito atualizacao knowledge" ON public.ia_vendedor_knowledge;
CREATE POLICY "Acesso público irrestrito atualizacao knowledge" ON public.ia_vendedor_knowledge FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso público irrestrito remocao knowledge" ON public.ia_vendedor_knowledge;
CREATE POLICY "Acesso público irrestrito remocao knowledge" ON public.ia_vendedor_knowledge FOR DELETE USING (true);

-- Realtime
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.ia_vendedor_knowledge;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END $$;
