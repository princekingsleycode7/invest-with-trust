import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, CalendarDays, Clock, Building2 } from "lucide-react";
import { Project } from "@/types/schema";
import { formatCurrency, formatPercentage, formatPayPeriod, formatDuration } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

interface ProjectFunding {
  current_amount: number;
  target_amount: number;
  status: string;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const [projectFunding, setProjectFunding] = useState<ProjectFunding>({
    current_amount: project.current_amount || 0,
    target_amount: project.target_amount || 0,
    status: project.status || 'active'
  });

  // Fetch current funding data from database
  const fetchProjectFunding = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('current_amount, target_amount, status')
        .eq('id', project.id)
        .single();

      if (error) {
        console.error('Error fetching project funding for card:', error);
        return;
      }

      if (data) {
        setProjectFunding({
          current_amount: data.current_amount || 0,
          target_amount: data.target_amount || project.target_amount || 0,
          status: data.status || 'active'
        });
      }
    } catch (error) {
      console.error('Error in fetchProjectFunding for card:', error);
    }
  };

  // Set up real-time subscription for this specific project
  useEffect(() => {
    // Initial fetch
    fetchProjectFunding();

    // Subscribe to real-time changes for this specific project
    const channel = supabase
      .channel(`project-card-${project.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${project.id}`
        },
        (payload) => {
          console.log(`Real-time update for project card ${project.id}:`, payload);
          
          // Update the funding state with new data
          const newData = payload.new;
          setProjectFunding({
            current_amount: newData.current_amount || 0,
            target_amount: newData.target_amount || project.target_amount || 0,
            status: newData.status || 'active'
          });
        }
      )
      .subscribe();

    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [project.id, project.target_amount]);

  const progressPercentage = (projectFunding.current_amount / projectFunding.target_amount) * 100;
  const isFullyFunded = projectFunding.current_amount >= projectFunding.target_amount;
  
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
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isFullyFunded ? 'ring-2 ring-green-200' : ''}`}>
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
          <Badge variant={projectFunding.status === 'active' && !isFullyFunded ? 'default' : 'secondary'} 
                 className={isFullyFunded ? 'bg-green-100 text-green-800' : ''}>
            {isFullyFunded ? 'FULLY FUNDED' : projectFunding.status.toUpperCase()}
          </Badge>
        </div>
        
        {/* Live update indicator */}
        <div className="absolute bottom-2 right-2">
          <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded text-xs text-white">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
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
              {formatCurrency(projectFunding.current_amount)} / {formatCurrency(projectFunding.target_amount)}
            </span>
          </div>
          <Progress 
            value={Math.min(progressPercentage, 100)} 
            className={`h-2 ${isFullyFunded ? '[&>div]:bg-green-500' : ''}`} 
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {formatPercentage(Math.min(progressPercentage, 100))} funded
            </div>
            {isFullyFunded && (
              <div className="text-xs font-medium text-green-600">
                Target Reached!
              </div>
            )}
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

        {isFullyFunded && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
            <p className="text-green-800 text-xs font-medium">
              Funding Complete - Thank you to all investors!
            </p>
          </div>
        )}

        <Button 
          onClick={() => onViewDetails(project.id)}
          className={`w-full mt-4 transition-colors ${
            isFullyFunded 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'group-hover:bg-primary/90'
          }`}
        >
          {isFullyFunded ? 'View Funded Project' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;