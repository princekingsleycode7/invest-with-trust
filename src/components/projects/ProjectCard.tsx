import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, CalendarDays, Clock, Building2 } from "lucide-react";
import { Project } from "@/types/schema";
import { formatCurrency, formatPercentage, formatPayPeriod, formatDuration } from "@/utils/formatters";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const progressPercentage = (project.current_amount / project.target_amount) * 100;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'manufacturing':
        return <Building2 className="h-4 w-4" />;
      case 'energy':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'manufacturing':
        return 'bg-orange-100 text-orange-800';
      case 'energy':
        return 'bg-green-100 text-green-800';
      case 'real_estate':
        return 'bg-blue-100 text-blue-800';
      case 'agriculture':
        return 'bg-yellow-100 text-yellow-800';
      case 'technology':
        return 'bg-purple-100 text-purple-800';
      case 'healthcare':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image_url}
          alt={`${project.name} - Industrial manufacturing facility with machinery and production equipment for charcoal briquette manufacturing by xyzcharlize on Unsplash`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ width: '100%', height: '192px' }}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className={`${getCategoryColor(project.category)} border-0`}>
            {getCategoryIcon(project.category)}
            <span className="ml-1 capitalize">{project.category.replace('_', ' ')}</span>
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
            {project.status.toUpperCase()}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {project.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Progress</span>
            <span className="font-medium">
              {formatCurrency(project.current_amount)} / {formatCurrency(project.target_amount)}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-right text-xs text-muted-foreground">
            {formatPercentage(progressPercentage)} funded
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Projected Return</p>
              <p className="font-semibold text-accent">{formatPercentage(project.projected_return)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Pay Period</p>
              <p className="font-semibold">{formatPayPeriod(project.pay_period)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-semibold text-sm">{formatDuration(project.duration_months)}</p>
          </div>
        </div>

        <Button 
          onClick={() => onViewDetails(project.id)}
          className="w-full mt-4 group-hover:bg-primary/90 transition-colors"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;