import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { ProjectCategory, ProjectStatus, SortOption } from "@/types/enums";
import { ProjectFilters } from "@/types/schema";

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
}

const ProjectFiltersComponent = ({ filters, onFiltersChange }: ProjectFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      category: value === 'all' ? undefined : value as ProjectCategory 
    });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      status: value === 'all' ? undefined : value as ProjectStatus 
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      sortBy: value as SortOption 
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value={ProjectCategory.MANUFACTURING}>Manufacturing</SelectItem>
              <SelectItem value={ProjectCategory.ENERGY}>Energy</SelectItem>
              <SelectItem value={ProjectCategory.REAL_ESTATE}>Real Estate</SelectItem>
              <SelectItem value={ProjectCategory.AGRICULTURE}>Agriculture</SelectItem>
              <SelectItem value={ProjectCategory.TECHNOLOGY}>Technology</SelectItem>
              <SelectItem value={ProjectCategory.HEALTHCARE}>Healthcare</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={ProjectStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={ProjectStatus.COMPLETED}>Completed</SelectItem>
            <SelectItem value={ProjectStatus.CLOSED}>Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy || SortOption.NEWEST} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortOption.NEWEST}>Newest First</SelectItem>
            <SelectItem value={SortOption.OLDEST}>Oldest First</SelectItem>
            <SelectItem value={SortOption.FUNDING_GOAL_HIGH}>Highest Goal</SelectItem>
            <SelectItem value={SortOption.FUNDING_GOAL_LOW}>Lowest Goal</SelectItem>
            <SelectItem value={SortOption.PROGRESS_HIGH}>Most Funded</SelectItem>
            <SelectItem value={SortOption.PROGRESS_LOW}>Least Funded</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectFiltersComponent;