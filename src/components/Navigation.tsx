import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">KidsVibeCodingClub</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="/#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="/tutorials" className="text-foreground hover:text-primary transition-colors">
              Tutorials
            </a>
            <a href="/community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="/getting-started" className="text-foreground hover:text-primary transition-colors">
              Getting Started
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
                <Button variant="hero" onClick={() => navigate("/share-project")}>
                  Share Project
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="hero" onClick={() => navigate("/auth")}>
                  Join Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
