import { Code2, Github, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">KidsVibeCodingClub</span>
            </div>
            <p className="text-muted-foreground">
              Where imagination meets code.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ebooks</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 KidsVibeCodingClub. All rights reserved.</p>
          <p className="mt-2 text-sm">Vibe Coded via Lovable</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
