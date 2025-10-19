import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Lock, Sparkles, Crown } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  tier: string;
  difficulty: number;
  category: string;
  free_content: string;
  paid_content: string | null;
  starter_code: string;
}

const TutorialDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('free');

  useEffect(() => {
    fetchTutorial();
    checkUserRole();
  }, [slug]);

  const fetchTutorial = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setTutorial(data);
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      toast.error("Failed to load tutorial");
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setUserRole(data.role);
      }
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty);
  };

  const isPremiumUser = userRole === 'premium' || userRole === 'admin';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutorial not found</h2>
          <Button onClick={() => navigate('/tutorials')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/tutorials')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Button>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
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
              <Badge variant="secondary">{tutorial.category}</Badge>
              <span className="text-sm">{getDifficultyStars(tutorial.difficulty)}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{tutorial.title}</h1>
            <p className="text-xl text-muted-foreground">{tutorial.description}</p>
          </div>

          <Tabs defaultValue="learn" className="space-y-6">
            <TabsList>
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="code">Code Playground</TabsTrigger>
              {tutorial.paid_content && (
                <TabsTrigger value="levelup" disabled={!isPremiumUser}>
                  <Crown className="w-4 h-4 mr-1" />
                  Level Up
                  {!isPremiumUser && <Lock className="w-3 h-3 ml-1" />}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="learn" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tutorial Instructions</CardTitle>
                  <CardDescription>Follow these steps to build your project</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{tutorial.free_content}</ReactMarkdown>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code">
              <CodeEditor starterCode={tutorial.starter_code} />
            </TabsContent>

            {tutorial.paid_content && (
              <TabsContent value="levelup">
                {isPremiumUser ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-primary" />
                        Premium Enhancements
                      </CardTitle>
                      <CardDescription>
                        Take your project to the next level with these advanced features
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{tutorial.paid_content}</ReactMarkdown>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>🔒 Premium Content</CardTitle>
                      <CardDescription>
                        Upgrade to Vibe Creator Club to unlock advanced features!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Get access to:</p>
                      <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Advanced animations and effects</li>
                        <li>Interactive features and controls</li>
                        <li>Custom image uploads</li>
                        <li>Unlimited project saves</li>
                        <li>Community gallery publishing</li>
                      </ul>
                      <Button onClick={() => navigate('/#pricing')}>
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium - $9.99/month
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TutorialDetail;
