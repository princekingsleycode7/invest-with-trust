import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFiltersComponent from "@/components/projects/ProjectFilters";
import ProjectDetailsView from "@/components/projects/ProjectDetailsView";
import { mockProjects, mockProjectDetails } from "@/data/projectsMockData";
import { Project, ProjectFilters } from "@/types/schema";
import { SortOption, ProjectCategory, ProjectStatus } from "@/types/enums";
import { useAuthContext } from "@/contexts/AuthContext";

const ProjectsPage = () => {
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    searchParams.get('id')
  );
  const [filters, setFilters] = useState<ProjectFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') as ProjectCategory || undefined,
    status: searchParams.get('status') as ProjectStatus || undefined,
    sortBy: (searchParams.get('sortBy') as SortOption) || SortOption.NEWEST,
  });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.status) params.set('status', filters.status);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (selectedProjectId) params.set('id', selectedProjectId);
    
    setSearchParams(params);
  }, [filters, selectedProjectId, setSearchParams]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case SortOption.NEWEST:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case SortOption.OLDEST:
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case SortOption.FUNDING_GOAL_HIGH:
        filtered.sort((a, b) => b.target_amount - a.target_amount);
        break;
      case SortOption.FUNDING_GOAL_LOW:
        filtered.sort((a, b) => a.target_amount - b.target_amount);
        break;
      case SortOption.PROGRESS_HIGH:
        filtered.sort((a, b) => (b.current_amount / b.target_amount) - (a.current_amount / a.target_amount));
        break;
      case SortOption.PROGRESS_LOW:
        filtered.sort((a, b) => (a.current_amount / a.target_amount) - (b.current_amount / b.target_amount));
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, filters]);

  const handleViewDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  const handleFiltersChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters);
  };

  // Show project details view
  if (selectedProjectId) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">RehobothBank</span>
              </div>
              
              <div className="flex items-center gap-4">
                {user && (
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </span>
                )}
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost">Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <ProjectDetailsView 
            projectDetails={mockProjectDetails}
            onBack={handleBackToProjects}
          />
        </div>
      </div>
    );
  }

  // Show projects list view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">RehobothBank</span>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
              )}
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Investment Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover carefully vetted investment opportunities with strong potential for consistent returns
          </p>
        </div>

        {/* Filters */}
        <ProjectFiltersComponent 
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more projects.
              </p>
              <Button 
                onClick={() => setFilters({ sortBy: SortOption.NEWEST })}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;