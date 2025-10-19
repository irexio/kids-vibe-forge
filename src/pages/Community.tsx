import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, HelpCircle, Image, Shield } from "lucide-react";

const Community = () => {
  const [user, setUser] = useState<any>(null);
  const [isModerator, setIsModerator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkModeratorStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkModeratorStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkModeratorStatus = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .in("role", ["moderator", "admin"]);

    setIsModerator((data || []).length > 0);
  };

  const sections = [
    {
      title: "Projects Gallery",
      description: "Share your coding projects and see what others are building!",
      icon: <Image className="w-8 h-8 text-primary" />,
      path: "/community/projects",
      color: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Forums",
      description: "Discuss coding topics, share tips, and connect with the community",
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      path: "/forums",
      color: "bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Q&A",
      description: "Ask coding questions and help others solve their challenges",
      icon: <HelpCircle className="w-8 h-8 text-primary" />,
      path: "/qa",
      color: "bg-green-500/10 border-green-500/20"
    }
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to the KidsVibeCodingClub community! Connect, share, learn, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sections.map((section, idx) => (
              <Card
                key={idx}
                className={`${section.color} hover:border-primary transition-all cursor-pointer`}
                onClick={() => navigate(section.path)}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {section.icon}
                  </div>
                  <CardTitle className="text-2xl text-center">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {section.description}
                  </CardDescription>
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Explore</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isModerator && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>Moderator Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  You have moderator access. Review pending content and manage reports.
                </p>
                <Button onClick={() => navigate("/moderation")} variant="hero">
                  Open Moderation Dashboard
                </Button>
              </CardContent>
            </Card>
          )}

          {!user && (
            <Card className="text-center mt-12">
              <CardContent className="py-12">
                <h3 className="text-2xl font-bold mb-4">Join Our Community!</h3>
                <p className="text-muted-foreground mb-6">
                  Sign in to share projects, ask questions, and connect with other young coders
                </p>
                <Button onClick={() => navigate("/auth")} variant="hero" size="lg">
                  Sign In / Join Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Community;
