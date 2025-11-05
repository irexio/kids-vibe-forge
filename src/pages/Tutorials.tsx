import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Lock, Crown } from "lucide-react";
import { toast } from "sonner";

interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  tier: string;
  difficulty: number;
  category: string;
}

const Tutorials = () => {
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select('id, title, slug, description, tier, difficulty, category')
        .order('order_index');

      if (error) throw error;
      setTutorials(data || []);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      toast.error("Failed to load tutorials");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="flex-1 py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Vibe Coding Tutorials</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to code by building awesome projects! Start with free tutorials, 
              then level up with premium enhancements.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <>
              {/* Tutorials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {tutorials.map((tutorial) => (
                  <Card 
                    key={tutorial.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer border-border"
                    onClick={() => navigate(`/tutorials/${tutorial.slug}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={tutorial.tier === 'free' ? 'outline' : 'default'}>
                          {tutorial.tier === 'free' ? (
                            <>
                              <Sparkles className="w-3 h-3 mr-1" />
                              Free
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              Premium
                            </>
                          )}
                        </Badge>
                        <span className="text-sm">{getDifficultyStars(tutorial.difficulty)}</span>
                      </div>
                      <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                      {tutorial.category && (
                        <Badge variant="secondary" className="w-fit">
                          {tutorial.category}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Premium Box - Full Width */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Crown className="w-6 h-6 text-primary" />
                    Unlock Premium Content
                  </CardTitle>
                  <CardDescription className="text-base">
                    Upgrade to Vibe Creator Club to unlock advanced features!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <p className="mb-3 font-semibold">Get access to:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Advanced animations and effects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Interactive features and controls
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Custom image uploads
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Unlimited project saves
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span> Community gallery publishing
                      </li>
                    </ul>
                  </div>
                  <Button 
                    size="lg"
                    className="md:w-auto w-full"
                    onClick={() => navigate('/#pricing')}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade - $14.99/month
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Tutorials;
