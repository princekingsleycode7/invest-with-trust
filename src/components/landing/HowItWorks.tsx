import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Play, Banknote } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: DollarSign,
      title: "Invest",
      description: "Browse available projects and invest in those that align with your goals. Set your investment amount and confirm your participation.",
      step: "01"
    },
    {
      icon: Play,
      title: "Project Goes Live",
      description: "Once funding goals are met, projects become active. You can track progress and performance through your personalized dashboard.",
      step: "02"
    },
    {
      icon: Banknote,
      title: "Get Paid",
      description: "Receive regular profit distributions based on project performance. All calculations are transparent and auditable.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How RehobothBank Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process that puts you in control of your investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;