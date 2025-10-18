import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const glossaryTerms = [
  {
    term: "AI (Artificial Intelligence)",
    definition: "A smart computer system that can understand language, recognize patterns, and help you create things faster.",
  },
  {
    term: "Algorithm",
    definition: "A set of step-by-step instructions that tell a computer how to solve a problem. Like a recipe for your code!",
  },
  {
    term: "API (Application Programming Interface)",
    definition: "A tool that lets different apps talk to each other — like a bridge between programs.",
  },
  {
    term: "Array",
    definition: "A list of items stored together in code. Like a shopping list with multiple items!",
  },
  {
    term: "Async/Await",
    definition: "A way to handle tasks that take time (like loading data) without freezing your app.",
  },
  {
    term: "Authentication",
    definition: "The process of verifying who someone is, usually with a username and password.",
  },
  {
    term: "Backend",
    definition: "The behind-the-scenes part of a website or app that handles data, logic, and storage. The engine that makes it all work!",
  },
  {
    term: "Bug",
    definition: "A mistake in your code that causes an error or unexpected behavior. Every coder finds bugs — it's part of learning!",
  },
  {
    term: "Callback",
    definition: "A function that runs after another function finishes. Like a reminder to do something next!",
  },
  {
    term: "Capacitor",
    definition: "A helper tool that turns web apps into mobile apps that work on phones and tablets.",
  },
  {
    term: "Class",
    definition: "A blueprint for creating objects in code. Like a cookie cutter that makes cookies of the same shape!",
  },
  {
    term: "Code",
    definition: "The language you write to tell a computer what to do.",
  },
  {
    term: "Commit",
    definition: "Saving a version of your project on GitHub. Like taking a snapshot of your work!",
  },
  {
    term: "Component",
    definition: "A reusable piece of a web app (like a button or menu) in frameworks like React.",
  },
  {
    term: "CSS (Cascading Style Sheets)",
    definition: "The part of code that controls how things look — colors, fonts, and layout.",
  },
  {
    term: "Database",
    definition: "An organized collection of data that apps can access and update. Like a digital filing cabinet!",
  },
  {
    term: "Debugger",
    definition: "A tool that helps you find and fix bugs in your code. Like being a code detective!",
  },
  {
    term: "Deploy",
    definition: "Making your app or website available on the internet for everyone to use.",
  },
  {
    term: "Domain Name",
    definition: "The web address people type to visit your site, like www.example.com.",
  },
  {
    term: "Event",
    definition: "Something that happens in your app, like a button click or mouse movement.",
  },
  {
    term: "Framework",
    definition: "A set of tools that help organize and speed up coding (like React, Next.js, or Vite). Like starting with LEGOs instead of making bricks from scratch!",
  },
  {
    term: "Frontend",
    definition: "The part of a website or app that users see and interact with. The buttons, colors, and layout!",
  },
  {
    term: "Function",
    definition: "A reusable block of code that performs a specific task. Like a magic spell you can cast whenever you need it!",
  },
  {
    term: "GitHub",
    definition: "A website where coders save, share, and collaborate on projects. Your code's home in the cloud!",
  },
  {
    term: "Hosting",
    definition: "The service that keeps your website online and accessible to visitors 24/7.",
  },
  {
    term: "HTML (HyperText Markup Language)",
    definition: "The foundation of every website — it tells the computer what to display.",
  },
  {
    term: "IDE (Integrated Development Environment)",
    definition: "A special program for writing code that has helpful features like auto-complete and error checking. Your coding workspace!",
  },
  {
    term: "Import/Export",
    definition: "Ways to share code between different files. Import brings code in, export sends it out!",
  },
  {
    term: "JavaScript (JS)",
    definition: "The language that makes websites interactive and dynamic. It's what makes buttons work and animations move!",
  },
  {
    term: "JSON (JavaScript Object Notation)",
    definition: "A format for storing and sharing data that's easy for computers to read and write.",
  },
  {
    term: "Library",
    definition: "A collection of pre-written code you can use in your projects. Like a toolbox full of helpful tools!",
  },
  {
    term: "Loop",
    definition: "Code that repeats over and over until a condition is met. Like doing homework problems until you finish them all!",
  },
  {
    term: "Lovable",
    definition: "An AI-powered platform where you can build full-stack web apps by chatting with AI. Perfect for vibe coding!",
  },
  {
    term: "Method",
    definition: "A function that belongs to an object or class. Like a special ability that object can use!",
  },
  {
    term: "Next.js",
    definition: "A powerful framework built on React that helps you build fast, organized web apps.",
  },
  {
    term: "Node.js",
    definition: "JavaScript that runs on the server instead of in a browser. It powers the backend!",
  },
  {
    term: "npm (Node Package Manager)",
    definition: "A tool that helps you install and manage code libraries in your projects.",
  },
  {
    term: "Object",
    definition: "A collection of related data and functions grouped together. Like a backpack holding different items!",
  },
  {
    term: "Open Source",
    definition: "Software with code that anyone can see, use, and improve. Sharing is caring in the coding world!",
  },
  {
    term: "Package",
    definition: "A bundle of code created by someone else that you can add to your project to save time.",
  },
  {
    term: "PRD (Product Requirements Document)",
    definition: "A plan that describes what your app will do and why it matters. Your project blueprint!",
  },
  {
    term: "Prompt",
    definition: "A sentence or question you give to AI to tell it what to do. The better the prompt, the better the result!",
  },
  {
    term: "Props",
    definition: "Information you pass from one React component to another. Like giving instructions to a helper!",
  },
  {
    term: "PWA (Progressive Web App)",
    definition: "A type of app that works offline and can be installed on mobile devices from your browser.",
  },
  {
    term: "React",
    definition: "A popular framework for building reusable parts of web apps using components.",
  },
  {
    term: "React Hooks",
    definition: "Special functions in React that give components superpowers like remembering data or running code at specific times.",
  },
  {
    term: "Repository (Repo)",
    definition: "A storage space for your project on GitHub. Like a folder that tracks all your code changes!",
  },
  {
    term: "State",
    definition: "Data in your app that can change over time. Like keeping track of a score in a game!",
  },
  {
    term: "String",
    definition: "Text stored in code, wrapped in quotes. Like \"Hello, World!\" — any words or letters!",
  },
  {
    term: "Supabase",
    definition: "A backend platform that handles databases, authentication, and file storage for your apps.",
  },
  {
    term: "Syntax",
    definition: "The grammar rules of a programming language. Just like English has grammar, code has syntax!",
  },
  {
    term: "Tailwind CSS",
    definition: "A CSS framework that lets you style websites quickly using pre-made utility classes.",
  },
  {
    term: "TypeScript",
    definition: "JavaScript with extra rules that help catch mistakes before your code runs.",
  },
  {
    term: "UI (User Interface)",
    definition: "Everything users see and interact with in an app or website. Buttons, menus, and screens!",
  },
  {
    term: "UX (User Experience)",
    definition: "How easy and enjoyable it is to use an app or website. Good UX makes people happy!",
  },
  {
    term: "Variable",
    definition: "A container that stores information in your code. Like a labeled box that holds data you can use later.",
  },
  {
    term: "Version Control",
    definition: "A system that tracks changes to code over time. Like a time machine for your projects!",
  },
  {
    term: "Vibe Coding",
    definition: "Building apps and ideas by describing them in plain language to AI tools. The future of coding!",
  },
  {
    term: "Vite",
    definition: "A super-fast build tool that helps web projects load and update quickly during development.",
  },
  {
    term: "VS Code / Cursor",
    definition: "Professional code editors that help you write and manage code with AI features and smart suggestions.",
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
