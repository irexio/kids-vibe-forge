const About = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Where Imagination Meets Code
        </h2>
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            In a world where technology never stops evolving, the way we learn to create with it has to evolve, too.
          </p>
          
          <p>
            Kids Vibe Coding Club introduces a new way to learn — vibe coding.
            It's coding powered by imagination and guided by AI.
          </p>
          
          <p>
            Instead of memorizing commands or worrying about syntax, kids learn to direct AI tools, design real projects, and understand how code comes to life.
          </p>
          
          <h3 className="text-2xl md:text-3xl font-bold text-foreground pt-8 pb-4">
            What Is Vibe Coding?
          </h3>
          
          <p>
            Vibe coding uses Artificial Intelligence (AI) to turn natural language into real, working code.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
