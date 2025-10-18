import { BookOpen, Sparkles, Brain, Zap, GraduationCap, FolderKanban, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose KidsVibeCodingClub?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to start your coding journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Card className="border-border bg-card hover:border-primary/50 transition-all p-6">
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Interactive Ebooks</h3>
            <p className="text-muted-foreground">
              Engaging content designed specifically for tweens with real-world coding projects and challenges.
            </p>
          </Card>

          <Card className="border-border bg-card hover:border-primary/50 transition-all p-6">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Learn by Doing</h3>
            <p className="text-muted-foreground">
              Hands-on projects that make coding fun and practical. Build real apps while learning.
            </p>
          </Card>

          <Card className="border-border bg-card hover:border-primary/50 transition-all p-6">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Track Progress</h3>
            <p className="text-muted-foreground">
              Celebrate achievements and milestones as you master new coding concepts and skills.
            </p>
          </Card>

          <Card className="border-border bg-card hover:border-primary/50 transition-all p-6">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Community Support</h3>
            <p className="text-muted-foreground">
              Connect with other young coders. Share projects, get help, and inspire others.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
