import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Variáveis de ambiente configuradas no .env
const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

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
