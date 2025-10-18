import { BookOpen, Sparkles, Brain, Zap, GraduationCap, FolderKanban, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're continuing your journey or just getting started, we have the perfect path for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Option 1: Have the Book */}
          <Card className="border-border bg-card hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-10 h-10 text-primary" />
                <CardTitle className="text-2xl">Option 1: "I Have Read the Companion Book"</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3">Welcome back, Vibe Coder!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You've already begun your journey through the Vibe Coding for Kids Companion Book — here you can build on your momentum, expand your knowledge, and connect with other creators who are learning just like you.
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Explore hands-on tutorials and real projects that extend what you discovered in the book. Each section ties directly to your chapters and creative challenges — so you can practice, remix, and share your own versions online.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Start with your favorite Chapter Challenge, try a new Mini-Vibe, or jump into the Community to exchange ideas and feedback.
              </p>
              
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-foreground mb-3">Discover:</h4>
                
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Mini-Vibes</p>
                    <p className="text-sm text-muted-foreground">"Remix Mode" — advanced prompts, editable templates, new challenges.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Tutorials</p>
                    <p className="text-sm text-muted-foreground">Expanded tutorials tied directly to Companion Book chapters, with deeper explanations and bonus "Code Labs."</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FolderKanban className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Projects</p>
                    <p className="text-sm text-muted-foreground">Unlockable "Book Missions" that connect to each chapter's challenge (like building the full game or app).</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Community</p>
                    <p className="text-sm text-muted-foreground">A private Companion Clubhouse for members who've read the book — they can share deeper builds and swap remix ideas.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Resources</p>
                    <p className="text-sm text-muted-foreground">Downloadable "Companion Assets" — flowcharts, pro prompt examples, code snippets from the book.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
                <div className="flex gap-2">
                  <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Tip:</p>
                    <p className="text-sm text-muted-foreground">
                      The more you explore, the more your creativity and confidence grow. Your book gave you the foundation — now the Club gives you the playground.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 2: New to Vibe Coding */}
          <Card className="border-border bg-card hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
                <CardTitle className="text-2xl">Option 2: "I Am New to Vibe Coding & Kids Vibe Coding Club"</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-3">Welcome — you're about to start coding the fun way!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Here, you can gain confidence, explore your creativity, and join a friendly community that helps beginners start strong.
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Vibe Coding uses AI to bring ideas to life — even if you've never written a single line of code before. You'll describe what you want to build, watch it come alive, and then learn how to understand and improve the code behind it.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                To learn the right way, we highly recommend starting with the <span className="font-semibold text-foreground">Vibe Coding for Kids Companion Book</span>. It walks you through your first vibe-coded app step by step — helping you understand what the AI is doing, why it works, and how to make it your own.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                We've built a Quick Start path just for you — filled with short, guided projects that make coding feel natural and exciting.
              </p>
              
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-foreground mb-3">Discover:</h4>
                
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Mini-Vibes</p>
                    <p className="text-sm text-muted-foreground">Quick, visual wins — 5-10 minute "wow moments."</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Tutorials</p>
                    <p className="text-sm text-muted-foreground">Intro series: loops, logic, patterns — short, self-contained.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FolderKanban className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Projects</p>
                    <p className="text-sm text-muted-foreground">Guided projects that teach the basics.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Community</p>
                    <p className="text-sm text-muted-foreground">Open threads for questions, sharing first wins.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Resources</p>
                    <p className="text-sm text-muted-foreground">Learn about Vibe Coding, prompts, safety.</p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed italic mt-6">
                Every coder starts somewhere — and this is your moment to begin. Let curiosity lead, and see what you can create!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
