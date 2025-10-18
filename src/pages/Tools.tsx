import { Sparkles, Code2, Zap, GitBranch, Bot, MessageSquare, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const tools = [
  {
    name: "Lovable",
    icon: Sparkles,
    description: "Build full-stack applications with AI. Chat with AI to create beautiful, functional web apps instantly. Perfect for learning by building real projects.",
    link: "https://lovable.dev",
    bestFor: "Beginners to Advanced",
  },
  {
    name: "Replit",
    icon: Code2,
    description: "Code, create, and learn together in the browser. Run code in 50+ languages, collaborate in real-time, and deploy your projects instantly.",
    link: "https://replit.com",
    bestFor: "All Levels",
  },
  {
    name: "Jules",
    icon: Bot,
    description: "AI coding assistant that helps you write, debug, and understand code. Get instant explanations and suggestions as you learn.",
    link: "https://jules.ai",
    bestFor: "Beginners",
  },
  {
    name: "GitHub Copilot",
    icon: GitBranch,
    description: "AI pair programmer that suggests code completions as you type. Learn coding patterns and best practices from AI suggestions.",
    link: "https://github.com/features/copilot",
    bestFor: "Intermediate to Advanced",
  },
  {
    name: "Cursor AI",
    icon: Zap,
    description: "AI-powered code editor built for pair programming with AI. Chat with your codebase, make changes with natural language, and learn faster.",
    link: "https://cursor.sh",
    bestFor: "Intermediate to Advanced",
  },
  {
    name: "Scratch",
    icon: Code2,
    description: "The world's largest coding community for children and a coding language with a simple visual interface. Create digital stories, games, and animations by snapping code blocks together. Developed by the Scratch Foundation to promote computational thinking, creativity, and collaboration.",
    link: "https://scratch.mit.edu/",
    bestFor: "Beginners (Ages 8-16)",
  },
];

const aiHelpers = [
  {
    name: "ChatGPT",
    icon: MessageSquare,
    description: "OpenAI's conversational AI assistant. Ask questions, get code explanations, debug problems, and learn programming concepts through conversation.",
    link: "https://chat.openai.com",
    bestFor: "All Levels",
  },
  {
    name: "Gemini",
    icon: Sparkles,
    description: "Google's advanced AI assistant. Get help with coding questions, project ideas, and learning new concepts. Great for research and problem-solving.",
    link: "https://gemini.google.com",
    bestFor: "All Levels",
  },
  {
    name: "Claude",
    icon: Bot,
    description: "Anthropic's helpful AI assistant. Excellent for code review, detailed explanations, and learning best practices. Great for understanding complex topics.",
    link: "https://claude.ai",
    bestFor: "All Levels",
  },
];

const Tools = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Popular Vibe Coding Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the best AI-powered tools to supercharge your coding journey
            </p>
          </div>

          <Alert className="max-w-4xl mx-auto mb-12 border-primary bg-primary/5">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <AlertTitle className="text-lg font-semibold">Premium Members Only</AlertTitle>
            <AlertDescription className="text-base leading-relaxed">
              Access to these tools requires a Premium membership. This ensures adult authorization and parental permission for young coders. Premium members also get exclusive tutorials and support for using these tools safely and effectively.
            </AlertDescription>
          </Alert>
          
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Coding Development Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card key={index} className="border-border bg-card hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        Best for: {tool.bestFor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.open(tool.link, '_blank')}
                      >
                        Learn More →
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-4 text-center">AI Helpers</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conversational AI assistants to help you learn, code, and solve problems
            </p>
            
            <Alert className="max-w-4xl mx-auto mb-8 border-amber-500 bg-amber-500/10">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-lg font-semibold text-amber-600 dark:text-amber-500">
                ⚠️ Parental Permission Required
              </AlertTitle>
              <AlertDescription className="text-base leading-relaxed">
                <strong>Young coders under 18 must have parental or guardian permission to use these AI tools.</strong> These are powerful learning assistants, but they collect data and require responsible use. Parents should review each tool's terms of service and privacy policy before granting access.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {aiHelpers.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card key={index} className="border-border bg-card hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        Best for: {tool.bestFor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => window.open(tool.link, '_blank')}
                      >
                        Learn More →
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Start Your Journey Today
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed mb-6">
              Each tool offers unique ways to learn and create. Try them out, find what works best for you, and remember — the best tool is the one you'll actually use!
            </p>
            <div className="flex justify-center">
              <Button variant="hero" size="lg" onClick={() => window.location.href = '/getting-started'}>
                Get Started with Vibe Coding
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Tools;
