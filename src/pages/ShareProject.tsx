import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { X } from "lucide-react";

const ShareProject = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Please sign in to share projects");
        navigate("/auth");
      }
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to share projects");
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!projectUrl && !youtubeUrl) {
      toast.error("Please provide at least a project URL or YouTube link");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("community_projects")
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          project_url: projectUrl.trim() || null,
          youtube_url: youtubeUrl.trim() || null,
          tags,
          status: "pending"
        });

      if (error) throw error;

      toast.success("Project submitted! It will be reviewed by moderators.");
      navigate("/community");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Share Your Project</CardTitle>
              <CardDescription>
                Show the world what you've built! Your project will be reviewed by moderators before it goes live.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Project Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="My Awesome Game"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your project! What does it do? What did you learn?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {description.length}/1000 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectUrl" className="text-sm font-medium">
                    Project Link
                  </label>
                  <Input
                    id="projectUrl"
                    type="url"
                    placeholder="https://scratch.mit.edu/projects/..."
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to your Scratch, Replit, Lovable, or other coding project
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="youtubeUrl" className="text-sm font-medium">
                    YouTube Video Link
                  </label>
                  <Input
                    id="youtubeUrl"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to your YouTube video demo (like Roblox gameplay!)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag (e.g., game, animation, website)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      maxLength={20}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Your project will be reviewed by our moderators to ensure it's appropriate and safe for all members. This usually takes 1-2 days.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/community")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1" variant="hero">
                    {loading ? "Submitting..." : "Submit Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ShareProject;
