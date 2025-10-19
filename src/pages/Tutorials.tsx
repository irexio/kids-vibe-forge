import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Sparkles, Lock } from "lucide-react";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Tutorials;
