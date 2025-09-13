import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, TrendingUp } from "lucide-react";

const FeaturedProjects = () => {
  const projects = [
    {
      id: "9c124a52-2cb8-4166-9636-d3280b4d7986",
    name: "Charcoal Briquette Manufacturing Company",
    description: "Converting sawdust waste into high-quality fuel briquettes for commercial and domestic use in Nigeria",
    fundingGoal: 15000000,
      currentFunding: 8500000,
      profitPercentage: 25.5,
      payPeriod: "Monthly",
      status: "Open",
      image: "https://images.unsplash.com/photo-1469289759076-d1484757abc3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxmYWN0b3J5JTIwbWFudWZhY3R1cmluZyUyMGluZHVzdHJpYWwlMjBtYWNoaW5lcnl8ZW58MHwwfHx8MTc1NzAwNjY2OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      id: "49389018-0f07-446d-aa5d-2c5c27da70e0", 
    name: "Green Energy Solar Farm",
    description: "Large-scale solar energy project with guaranteed government contracts",
       fundingGoal: 750000,
      currentFunding: 680000,
      profitPercentage: 15,
      payPeriod: "Quarterly",
      status: "Open",
       image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneSUyMHNvbGFyJTIwZmFybSUyMHBob3Rvdm9sdGFpY3xlbnwwfDB8fGJsdWV8MTc1NzAwNjY2N3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      id: "6b4ef312-9c09-488e-86fa-d0eeaf2a242b",
    name: "Urban Real Estate Development", 
    description: "Mixed-use development in prime downtown location",
    fundingGoal: 300000,
      currentFunding: 300000,
      profitPercentage: 18,
      payPeriod: "Quaterly",
      status: "Live", 
      image: "https://images.unsplash.com/photo-1640184713822-174b6e94df51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxza3lzY3JhcGVycyUyMHVyYmFuJTIwZGV2ZWxvcG1lbnQlMjBjb25zdHJ1Y3Rpb24lMjBkb3dudG93bnxlbnwwfDB8fHwxNzU3MDA2NjY4fDA&ixlib=rb-4.1.0&q=85"
 
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