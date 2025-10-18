import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Access to ebook companions",
      "Basic video tutorials (coming soon)",
      "Code snippets library",
    ],
    cta: "Start Free",
    variant: "outline" as const,
  },
  {
    name: "Premium",
    price: "$14.99",
    period: "/month",
    description: "Unlock your full coding potential",
    features: [
      "All free features",
      "Complete ebook library",
      "Premium video tutorials (coming soon)",
      "Interactive coding challenges",
      "Priority community support",
      "Downloadable project files",
      "Certificate of completion",
    ],
    cta: "Go Premium",
    variant: "hero" as const,
    popular: true,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free or unlock everything with Premium
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-border ${
                plan.popular ? 'border-primary shadow-[var(--shadow-glow)] scale-105' : 'border-primary'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-3">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="py-3">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className={plan.popular ? "w-full" : "w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
