import { User, BookOpen, LayoutGrid, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { icon: User, label: "Account", desc: "Manage your profile and settings" },
  { icon: BookOpen, label: "Introduction", desc: "Learn how the sandbox works" },
  { icon: LayoutGrid, label: "Sandbox", desc: "Express emotions through objects" },
  { icon: Mail, label: "Contact Us", desc: "Send feedback or ask for help" },
];

export function AppSidebar() {
  return (
    <aside className="flex flex-col w-16 lg:w-52 min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-sidebar-border">
        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-sm font-medium">R</span>
        </div>
        <span className="hidden lg:block text-sm font-medium text-foreground tracking-tight">
          Reflective Sandbox
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(({ icon: Icon, label, desc }) => {
          const isActive = label === "Sandbox";
          return (
            <Tooltip key={label} delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150
                    ${isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }
                  `}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                  <span className="hidden lg:block">{label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs max-w-48">
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground">{desc}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="p-3 hidden lg:block">
        <div className="rounded-lg bg-secondary/60 p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            A quiet space for reflection and self-discovery.
          </p>
        </div>
      </div>
    </aside>
  );
}
