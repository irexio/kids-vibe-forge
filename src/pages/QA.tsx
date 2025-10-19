import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, ThumbsUp, Eye } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  views_count: number;
  votes_count: number;
  answers_count: number;
  is_solved: boolean;
  created_at: string;
  user_id: string;
}

interface Profile {
  display_name: string | null;
  username: string | null;
}

const QA = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("qa_questions")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setQuestions(data || []);

      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(q => q.user_id))];
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, display_name, username")
          .in("id", userIds);

        if (profilesData) {
          const profilesMap: Record<string, Profile> = {};
          profilesData.forEach(p => {
            profilesMap[p.id] = {
              display_name: p.display_name,
              username: p.username
            };
          });
          setProfiles(profilesMap);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load questions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Q&A
              </h1>
              <p className="text-xl text-muted-foreground">
                Ask coding questions and help others learn!
              </p>
            </div>
            {user && (
              <Button onClick={() => navigate("/qa/ask")} size="lg" variant="hero">
                Ask Question
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-xl text-muted-foreground mb-4">
                  No questions yet! Be the first to ask.
                </p>
                {user && (
                  <Button onClick={() => navigate("/qa/ask")} variant="hero">
                    Ask Question
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className="hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => navigate(`/qa/${question.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-2 text-center min-w-[60px]">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-bold">{question.votes_count}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">votes</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="text-xl hover:text-primary transition-colors">
                            {question.title}
                            {question.is_solved && (
                              <CheckCircle2 className="inline-block ml-2 w-5 h-5 text-green-500" />
                            )}
                          </CardTitle>
                        </div>
                        
                        <CardDescription className="mt-2 line-clamp-2">
                          {question.content.substring(0, 150)}...
                        </CardDescription>

                        {question.tags && question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span>
                            by {profiles[question.user_id]?.display_name || profiles[question.user_id]?.username || "Anonymous"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {question.answers_count} {question.answers_count === 1 ? "answer" : "answers"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {question.views_count}
                          </span>
                          <span>{formatDate(question.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
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

export default QA;
