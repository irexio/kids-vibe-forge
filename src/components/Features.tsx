import { BookOpen, Zap, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Ebooks",
    description: "Engaging content designed specifically for tweens with real-world coding projects and challenges.",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description: "Hands-on projects that make coding fun and practical. Build real apps while learning.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Celebrate achievements and milestones as you master new coding concepts and skills.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant community of young coders. Share projects, get help, and inspire others.",
  },
];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-card hover:border-primary/50 transition-all hover:shadow-[var(--shadow-glow)] group"
            >
              <CardHeader>
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
