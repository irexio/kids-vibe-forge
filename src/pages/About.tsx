import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 mt-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Welcome to the Kids Vibe Coding Club!
          </h1>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground pb-4">
              A Note to Parents
            </h2>

            <p>
              In a world where technology never stops evolving, the way we learn to create with it has to evolve, too. You've found the perfect place for your child to start their creative coding journey in a fun, intuitive, and powerful new way. Welcome to the club!
            </p>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground pt-8 pb-4">
              What is Vibe Coding?
            </h3>
            
            <p>
              You might wonder how your child can learn to code when the tools and languages seem so complex. That's where vibe coding comes in.
            </p>

            <p>
              Vibe coding uses Artificial Intelligence (AI) to generate real, working code from natural language prompts. Instead of typing complex commands like <code className="px-2 py-1 rounded bg-muted text-foreground">function drawCircle(color, radius)</code>, your child can simply say, "Create a red circle."
            </p>

            <p>
              This immediately lowers the barrier to entry, making programming accessible and exciting—especially for young minds who might be intimidated by endless syntax or tiny typing errors. Instead of getting stuck on a misplaced semicolon, your child can focus on what truly matters: creativity, logic, and bringing their ideas to life. They'll see results almost instantly, which keeps motivation high and helps them understand that technology is something they can shape, not just consume.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground pt-8 pb-4">
              Building Skills for a Modern World
            </h3>

            <p>
              Vibe coding reflects where the professional tech world is heading: toward AI-assisted creation. By learning how to prompt, guide, and refine what an AI builds, your child is developing a skill set that's both modern and deeply human—rooted in communication, creativity, and critical thinking.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground pt-8 pb-4">
              Get the Vibe Coding for Kids Companion Book
            </h3>

            <p>
              This website is your child's playground to practice, explore, and share their creations. To get the most out of their journey, we recommend starting with our companion book, which takes a deeper dive into the core concepts of vibe coding.
            </p>

            <p>
              Our book, <span className="font-semibold text-foreground">Vibe Coding for Kids — A Quick Start Guide</span>, provides the solid foundation for everything you're learning here. It helps you build the right habits, understand how AI-driven code works, and develop the skills you'll need for lasting success.
            </p>

            <p className="font-semibold text-foreground">
              Start strong. Learn the right way.
            </p>

            <div className="pt-6 text-center">
              <Button size="lg" className="text-lg">
                Get the Book →
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default About;
