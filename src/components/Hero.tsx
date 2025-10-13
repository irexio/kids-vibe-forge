import { Button } from "@/components/ui/button";
import { Code2, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      
      <div className="container mx-auto px-4 z-10 text-center animate-slide-up">
        <div className="flex items-center justify-center gap-2 mb-6 animate-float">
          <Code2 className="w-12 h-12 text-primary animate-glow" />
          <Sparkles className="w-8 h-8 text-accent animate-glow" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
          KidsVibeCodingClub
        </h1>
        
        <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light">
          Where Imagination Meets Code
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Your digital companion for learning to code. Interactive ebooks designed for tweens and beginners aged 11-17.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Get Started Free
          </Button>
          <Button variant="accent" size="lg" className="text-lg px-8 py-6">
            Explore Premium
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
