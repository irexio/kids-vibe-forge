import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Sparkles, Crown, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

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
      
      // Parse content into steps
      const stepMatches = data.free_content.split(/(?=^##\s+Step\s+\d+:|^Step\s+\d+:)/m);
      const parsedSteps = stepMatches.filter(step => step.trim().length > 0);
      setSteps(parsedSteps);
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

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instructions Panel */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Instructions</CardTitle>
                  <Badge variant="secondary">
                    Step {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
                <CardDescription>Follow along step by step</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-6">
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm font-medium mb-3">
                    Type your code exactly as shown below, pay close attention to uppercase and lowercase, and all other details and type it exactly.
                  </p>
                  <p className="text-sm font-medium">
                    Be sure to type inside the "body" between:
                  </p>
                  <pre className="text-sm mt-2 p-2 bg-background rounded border border-border">
                    {`<script>\n  Your Code Goes Here\n</script>`}
                  </pre>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert [&>h1]:mb-6 [&>h2]:mb-4 [&>h2]:mt-6 [&>h3]:mb-3 [&>h3]:mt-4 [&>p]:mb-4 [&>p]:leading-relaxed">
                  <ReactMarkdown>{steps[currentStep] || tutorial.free_content}</ReactMarkdown>
                </div>
              </CardContent>
              <div className="border-t p-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>

            {/* Code Editor Panel */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle>Code Playground</CardTitle>
                <CardDescription>Type your code and see it come to life!</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 min-h-0">
                <CodeEditor starterCode={tutorial.starter_code || '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><h1>Welcome!</h1><p>Edit code and click Run.</p></body></html>'} />
              </CardContent>
            </Card>
          </div>

          {/* Premium Content */}
          {tutorial.paid_content && (
            <Card className="mt-6">
              {isPremiumUser ? (
                <>
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
                </>
              ) : (
                <>
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
                      Upgrade to Premium - $14.99/month
                    </Button>
                  </CardContent>
                </>
              )}
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TutorialDetail;
