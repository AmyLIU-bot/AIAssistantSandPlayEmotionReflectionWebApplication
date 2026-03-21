import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, BarChart3, User, Play, BookOpen, Mail, ChevronDown, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const accountSubItems = [
  { title: "Home", path: "/", icon: Home },
  { title: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { title: "Profile", path: "/profile", icon: User },
];

const mainItems = [
  { title: "Sandbox", path: "/sandbox", icon: Play },
  { title: "Introduction", path: "/introduction", icon: BookOpen },
  { title: "Contact Us", path: "/contact", icon: Mail },
];

const AppSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [accountOpen, setAccountOpen] = useState(true);
  const location = useLocation();

  const isAccountActive = accountSubItems.some((item) => item.path === location.pathname);

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? 220 : 68 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-3 top-3 bottom-3 z-50 flex flex-col glass-card rounded-2xl overflow-hidden md:flex"
      style={{ boxShadow: "0 8px 32px hsla(145, 20%, 50%, 0.12)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border/40">
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <motion.span
          animate={{ opacity: expanded ? 1 : 0 }}
          className="text-lg font-semibold text-foreground whitespace-nowrap overflow-hidden"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
          Serenity
        </motion.span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
        {/* Account section */}
        <button
          onClick={() => setAccountOpen((prev) => !prev)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left ${
            isAccountActive && !accountOpen
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          <User className="w-5 h-5 shrink-0" />
          <motion.span
            animate={{ opacity: expanded ? 1 : 0 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden flex-1"
          >
            Account
          </motion.span>
          <motion.div animate={{ opacity: expanded ? 1 : 0, rotate: accountOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4 shrink-0" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {accountOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {accountSubItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl transition-all duration-200 group ${
                      expanded ? "pl-6 pr-3" : "px-3"
                    } py-2 ${
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <motion.span
                      animate={{ opacity: expanded ? 1 : 0 }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.title}
                    </motion.span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="h-px bg-border/40 my-2" />

        {/* Main items */}
        {mainItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <motion.span
                animate={{ opacity: expanded ? 1 : 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {item.title}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      {/* Footer breathing dot */}
      <div className="px-4 py-4 flex items-center gap-3 border-t border-border/40">
        <div className="w-3 h-3 rounded-full bg-primary animate-breathe shrink-0" />
        <motion.span
          animate={{ opacity: expanded ? 1 : 0 }}
          className="text-xs text-muted-foreground whitespace-nowrap"
        >
          All is well
        </motion.span>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
