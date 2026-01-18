import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="px-6 py-3 flex items-center justify-between text-sm text-muted-foreground">
      <span>Built by <span className="text-foreground font-medium">Vikas Kaushik</span></span>
      <div className="flex gap-3">
        <a href="#" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
        <a href="#" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
      </div>
      <span>© 2026 Tortoise</span>
    </div>
  </footer>
);

export default Footer;
