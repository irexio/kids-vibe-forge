import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, ExternalLink, Youtube } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  project_url: string | null;
  youtube_url: string | null;
  image_urls: string[];
  tags: string[];
  likes_count: number;
  views_count: number;
  created_at: string;
  user_id: string;
}

interface Profile {
  display_name: string | null;
  username: string | null;
}

const Community = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("community_projects")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);

      // Fetch profiles for these projects
      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(p => p.user_id))];
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
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (projectId: string) => {
    if (!user) {
      toast.error("Please sign in to like projects");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from("project_likes")
        .insert({ project_id: projectId, user_id: user.id });

      if (error) throw error;
      toast.success("Project liked!");
      fetchProjects();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("You already liked this project");
      } else {
        toast.error("Failed to like project");
      }
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Community Projects
              </h1>
              <p className="text-xl text-muted-foreground">
                Check out what amazing things kids are building!
              </p>
            </div>
            {user && (
              <Button onClick={() => navigate("/share-project")} size="lg" variant="hero">
                Share Your Project
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-xl text-muted-foreground mb-4">
                  No projects yet! Be the first to share.
                </p>
                {user && (
                  <Button onClick={() => navigate("/share-project")} variant="hero">
                    Share Your Project
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.youtube_url && (
                        <Youtube className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      by {profiles[project.user_id]?.display_name || profiles[project.user_id]?.username || "Anonymous"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button
                        onClick={() => handleLike(project.id)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        {project.likes_count}
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        0
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {project.project_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(project.project_url!, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      )}
                      {project.youtube_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(project.youtube_url!, "_blank")}
                        >
                          <Youtube className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                      )}
                    </div>
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

export default Community;
