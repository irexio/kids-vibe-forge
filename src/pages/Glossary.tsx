import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const glossaryTerms = [
  {
    term: "Algorithm",
    definition: "A step-by-step set of instructions to solve a problem or complete a task. Like a recipe for your code!",
  },
  {
    term: "API (Application Programming Interface)",
    definition: "A way for different programs to talk to each other. Like a waiter taking your order to the kitchen.",
  },
  {
    term: "Bug",
    definition: "An error or mistake in code that makes a program not work correctly. Every coder finds bugs — it's part of learning!",
  },
  {
    term: "Code",
    definition: "Instructions written in a programming language that tell a computer what to do.",
  },
  {
    term: "Debugging",
    definition: "The process of finding and fixing bugs in your code. Like being a code detective!",
  },
  {
    term: "Frontend",
    definition: "The part of a website or app that users see and interact with. The buttons, colors, and layout!",
  },
  {
    term: "Backend",
    definition: "The behind-the-scenes part of a website or app that handles data, logic, and storage. The engine that makes it all work!",
  },
  {
    term: "Function",
    definition: "A reusable block of code that performs a specific task. Like a magic spell you can cast whenever you need it!",
  },
  {
    term: "HTML",
    definition: "HyperText Markup Language — the code used to structure and display content on web pages.",
  },
  {
    term: "CSS",
    definition: "Cascading Style Sheets — the code that makes websites look pretty with colors, fonts, and layouts.",
  },
  {
    term: "JavaScript",
    definition: "A programming language that makes websites interactive. It's what makes buttons work and animations move!",
  },
  {
    term: "Loop",
    definition: "Code that repeats over and over until a condition is met. Like doing homework problems until you finish them all!",
  },
  {
    term: "Variable",
    definition: "A container that stores information in your code. Like a labeled box that holds data you can use later.",
  },
  {
    term: "Repository (Repo)",
    definition: "A storage location for code projects, usually on platforms like GitHub. Your code's home!",
  },
  {
    term: "Version Control",
    definition: "A system that tracks changes to code over time. Like a time machine for your projects!",
  },
  {
    term: "Open Source",
    definition: "Software with code that anyone can see, use, and improve. Sharing is caring in the coding world!",
  },
  {
    term: "Framework",
    definition: "A pre-built structure that helps you build apps faster. Like starting with LEGOs instead of making bricks from scratch!",
  },
  {
    term: "Library",
    definition: "A collection of pre-written code you can use in your projects. Like a toolbox full of helpful tools!",
  },
  {
    term: "Deploy",
    definition: "Making your app or website available on the internet for everyone to use.",
  },
  {
    term: "IDE (Integrated Development Environment)",
    definition: "A special program for writing code that has helpful features like auto-complete and error checking. Your coding workspace!",
  },
  {
    term: "Syntax",
    definition: "The grammar rules of a programming language. Just like English has grammar, code has syntax!",
  },
  {
    term: "Database",
    definition: "An organized collection of data that apps can access and update. Like a digital filing cabinet!",
  },
  {
    term: "UI (User Interface)",
    definition: "Everything users see and interact with in an app or website. Buttons, menus, and screens!",
  },
  {
    term: "UX (User Experience)",
    definition: "How easy and enjoyable it is to use an app or website. Good UX makes people happy!",
  },
];

const Glossary = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-24 px-4 mt-16">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Coding Glossary
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your guide to understanding coding terms and concepts. Learn the language of code!
            </p>
          </div>

          <div className="grid gap-4">
            {glossaryTerms.map((item, index) => (
              <Card key={index} className="border-border bg-card hover:border-primary/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Keep Learning! 🚀
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              This glossary will grow as you learn more. Don't worry if some terms seem confusing at first — 
              every coder started exactly where you are now!
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Glossary;
