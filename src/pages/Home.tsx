import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(140,30%,94%)] via-[hsl(80,20%,93%)] to-[hsl(38,35%,92%)] flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left — Introduction */}
        <div className="flex-[3] max-w-xl lg:max-w-none space-y-8 animate-fade-up">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[hsl(160,25%,42%)]/15 flex items-center justify-center">
              <span className="text-[hsl(160,25%,42%)] text-base font-semibold">R</span>
            </div>
            <span className="text-sm font-medium tracking-tight text-foreground/70">
              Reflective Sandbox
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-foreground text-wrap-balance">
              What is a Sandbox?
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
              A sandbox is a creative space where users can express their emotions by placing objects and building a scene instead of using words.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
              The system then reflects their emotions in a gentle and meaningful way.
            </p>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 pt-2">
            {["hsl(160,22%,72%)", "hsl(38,30%,78%)", "hsl(200,18%,78%)"].map((c, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c, animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Right — Login Card */}
        <div
          className="flex-[2] w-full max-w-sm animate-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-white/60 p-8 space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold text-foreground">Login</h2>
              <p className="text-sm text-muted-foreground">Welcome back to your quiet space.</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/sandbox");
              }}
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/60 border-border/60 focus:border-primary/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/60 border-border/60 focus:border-primary/40 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[hsl(160,22%,45%)] hover:bg-[hsl(160,22%,40%)] text-white transition-all duration-200 active:scale-[0.98]"
              >
                Login
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <Button
              variant="outline"
              className="w-full gap-2 bg-white/50 hover:bg-white/80 border-border/60 transition-all duration-200 active:scale-[0.98]"
              onClick={() => navigate("/sandbox")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                className="text-[hsl(160,22%,45%)] hover:text-[hsl(160,22%,38%)] font-medium transition-colors underline underline-offset-2"
                onClick={() => {}}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
