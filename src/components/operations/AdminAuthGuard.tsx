import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import {
  ShieldAlert,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string;
  logout: () => void | Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  adminEmail: "",
  logout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

// Chaves do login antigo (senhas escritas no código). Só são apagadas do navegador.
const LEGACY_STORAGE_KEYS = ["sbs_admin_auth_session", "sbs_admin_custom_key"];

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingCheck, setIsLoadingCheck] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Limpar o login antigo, que aceitava senhas fixas.
    try {
      LEGACY_STORAGE_KEYS.forEach((key) => {
        window.localStorage?.removeItem(key);
        window.sessionStorage?.removeItem(key);
      });
    } catch {
      /* ignore */
    }

    if (!isSupabaseConfigured()) {
      setIsLoadingCheck(false);
      return;
    }

    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setIsAuthenticated(Boolean(data.session));
        setEmail(data.session?.user?.email ?? "");
      })
      .catch((err) => {
        console.warn("Falha ao verificar a sessão:", err);
      })
      .finally(() => {
        if (active) setIsLoadingCheck(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setIsAuthenticated(Boolean(session));
      setEmail(session?.user?.email ?? "");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Por favor, insira o seu e-mail de administrador.");
      return;
    }

    if (!password) {
      setError("Por favor, insira a sua senha.");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("O servidor de autenticação não está configurado.");
      return;
    }

    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setIsSubmitting(false);

    if (signInError) {
      setError("E-mail ou senha incorretos.");
      toast.error("Falha na autenticação administrativa");
      return;
    }

    setPassword("");
    toast.success("Acesso autorizado ao Centro de Operações!");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPassword("");
    toast.info("Sessão administrativa encerrada.");
  };

  if (isLoadingCheck) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080A0F] text-[#F5F7FA]">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin" />
          <p className="text-xs text-[#A7B0BF]">Verificando credenciais de acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#080A0F] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-[#3B82F6]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 size-80 rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none" />

        {/* Top return link */}
        <div className="w-full max-w-md mb-4 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A7B0BF] hover:text-[#F5F7FA] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Voltar ao Website Principal</span>
          </a>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider">
            <Lock className="size-3" /> Área Restrita
          </span>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md rounded-[16px] border border-[#252C38] bg-[#0E121A]/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-[#252C38]/80 mb-6">
            <div className="relative mb-3.5">
              <div className="flex size-14 items-center justify-center rounded-[12px] bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] text-white font-extrabold text-lg shadow-[0_0_24px_rgba(59,130,246,0.4)]">
                AD
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#0E121A] border border-[#252C38]">
                <ShieldAlert className="size-3 text-[#8B5CF6]" />
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#F5F7FA]">Centro de Operações</h1>
            <p className="mt-1 text-xs text-[#A7B0BF]">
              Acesso exclusivo para administradores e operadores autorizados
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-[8px] border border-[#EF4444]/40 bg-[#EF4444]/10 p-3 flex items-start gap-2.5 text-xs text-[#FCA5A5] animate-shake">
                <AlertCircle className="size-4 shrink-0 mt-0.5 text-[#EF4444]" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-[#F5F7FA] mb-1.5"
              >
                E-mail Administrativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="o-seu-email@exemplo.com"
                  autoComplete="username"
                  required
                  className="w-full h-11 rounded-[10px] border border-[#252C38] bg-[#151A23] pl-10 pr-4 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-[#F5F7FA]"
                >
                  Senha
                </label>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full h-11 rounded-[10px] border border-[#252C38] bg-[#151A23] pl-10 pr-10 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#F5F7FA] transition-colors p-1"
                  aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 mt-2 rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] font-semibold text-xs text-white shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <LogIn className="size-4" />
                  <span>Entrar no Centro de Operações</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* Footer info */}
        <p className="mt-6 text-[11px] text-[#667085] text-center max-w-sm">
          Acesso restrito sob conformidade de segurança e auditoria interna da Agentes Digital.
        </p>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminEmail: email, logout }}>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </AdminAuthContext.Provider>
  );
}
