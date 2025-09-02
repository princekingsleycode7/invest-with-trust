import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, TrendingUp } from "lucide-react";

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Green Energy Solar Farm",
      description: "Large-scale solar energy project with guaranteed government contracts",
      fundingGoal: 500000,
      currentFunding: 425000,
      profitPercentage: 12,
      payPeriod: "Monthly",
      status: "Open",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Urban Real Estate Development",
      description: "Mixed-use development in prime downtown location",
      fundingGoal: 750000,
      currentFunding: 680000,
      profitPercentage: 15,
      payPeriod: "Quarterly",
      status: "Open",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Agricultural Technology Hub",
      description: "Smart farming technology center with export potential",
      fundingGoal: 300000,
      currentFunding: 300000,
      profitPercentage: 18,
      payPeriod: "Monthly",
      status: "Live",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Investment Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully vetted projects with strong potential for consistent returns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => {
            const progressPercentage = (project.currentFunding / project.fundingGoal) * 100;
            
            return (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/5"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === "Live" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium">
                        ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Projected Return</p>
                        <p className="font-semibold text-accent">{project.profitPercentage}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pay Period</p>
                        <p className="font-semibold">{project.payPeriod}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;