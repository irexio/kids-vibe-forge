import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  thread_count?: number;
}

const Forums = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .order("order_index");

      if (error) throw error;

      // Get thread counts for each category
      const categoriesWithCounts = await Promise.all(
        (data || []).map(async (cat) => {
          const { count } = await supabase
            .from("forum_threads")
            .select("*", { count: "exact", head: true })
            .eq("category_id", cat.id)
            .eq("status", "approved");

          return { ...cat, thread_count: count || 0 };
        })
      );

      setCategories(categoriesWithCounts);
    } catch (error: any) {
      toast.error("Failed to load forum categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Forums
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with other young coders, share ideas, and get help!
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading forums...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => navigate(`/forums/${category.slug}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{category.icon}</span>
                          <CardTitle className="text-2xl">{category.name}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {category.description}
                        </CardDescription>
                      </div>
                      <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {category.thread_count} {category.thread_count === 1 ? "thread" : "threads"}
                      </Badge>
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

export default Forums;
