-- ==============================================================================
-- CAMPANHAS DE DISPARO E FILA DE MENSAGENS WHATSAPP
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.campanhas_disparo (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'em_andamento', 'pausada', 'concluida'
    total INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.disparo_fila (
    id BIGSERIAL PRIMARY KEY,
    campanha_id BIGINT NOT NULL REFERENCES public.campanhas_disparo(id) ON DELETE CASCADE,
    empresa TEXT NOT NULL DEFAULT 'Empresa Sem Nome',
    telefone TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    oferta TEXT,
    angulo TEXT,
    cidade TEXT,
    status TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'enviado', 'falhou'
    erro TEXT,
    enviado_em TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_disparo_fila_campanha_id ON public.disparo_fila(campanha_id);
CREATE INDEX IF NOT EXISTS idx_disparo_fila_status ON public.disparo_fila(status);
CREATE INDEX IF NOT EXISTS idx_campanhas_disparo_status ON public.campanhas_disparo(status);

-- RLS
ALTER TABLE public.campanhas_disparo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disparo_fila ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso irrestrito campanhas_disparo" ON public.campanhas_disparo;
CREATE POLICY "Acesso irrestrito campanhas_disparo" ON public.campanhas_disparo FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso irrestrito disparo_fila" ON public.disparo_fila;
CREATE POLICY "Acesso irrestrito disparo_fila" ON public.disparo_fila FOR ALL USING (true) WITH CHECK (true);

-- Realtime
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.campanhas_disparo;
        ALTER PUBLICATION supabase_realtime ADD TABLE public.disparo_fila;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END $$;
