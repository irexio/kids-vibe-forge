import { BookOpen, Zap, Trophy, Users, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Ebooks",
    description: "Engaging lessons designed just for tweens and teens. Learn through stories, visuals, and real code challenges.",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description: "Hands-on projects that make coding practical and fun. Each tutorial connects what kids imagine to what they build.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Celebrate milestones and achievements as your child masters new coding concepts.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with other young coders and families in a safe, moderated space. Share projects, ask questions, and celebrate progress together.",
  },
  {
    icon: Gamepad2,
    title: "Real Projects",
    description: "From beginner Scratch builds to full app prototypes, our guided projects help kids create something they can show off.",
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
            Everything your child needs to start their coding journey — all in one fun, creative space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
