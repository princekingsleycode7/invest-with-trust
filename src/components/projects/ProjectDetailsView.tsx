import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Calendar,
  Users,
  Leaf,
  Building2,
  ChartColumnIncreasing,
  Clock
} from "lucide-react";
import { ProjectDetails } from "@/types/schema";
import { formatCurrency, formatPercentage } from "@/utils/formatters";
import InvestmentModal from "@/components/investment/InvestmentModal";

interface ProjectDetailsViewProps {
  projectDetails: ProjectDetails;
  onBack: () => void;
}

const ProjectDetailsView = ({ projectDetails, onBack }: ProjectDetailsViewProps) => {
  const project = {
    id: projectDetails.id,
    name: projectDetails.name,
    description: projectDetails.executive_summary.slice(0, 200) + "...",
    target_amount: projectDetails.total_funding_needed,
    current_amount: projectDetails.total_funding_needed * 0.56, // Mock current amount
    status: 'active'
  };

  const progressPercentage = (project.current_amount / project.target_amount) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/5">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">{projectDetails.name}</h1>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Building2 className="h-4 w-4 mr-1" />
                  Manufacturing
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-white border-green-500/30">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Target Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(projectDetails.total_funding_needed)}</p>
            </div>
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Current Funding</p>
              <p className="text-2xl font-bold">{formatCurrency(project.current_amount)}</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Expected ROI</p>
              <p className="text-2xl font-bold">{formatPercentage(projectDetails.annual_return_range[0])}</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Break-even</p>
              <p className="text-2xl font-bold">{projectDetails.breakeven_point}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Funding Progress</span>
              <span className="text-sm font-bold">
                {formatPercentage(progressPercentage)} funded
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-4" />
            <div className="flex justify-center">
              <InvestmentModal project={project} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {projectDetails.executive_summary}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {projectDetails.business_overview}
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Production Capacity</h4>
                <p className="text-muted-foreground">{projectDetails.production_capacity}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Investment Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectDetails.funding_breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <p className="text-sm text-muted-foreground">{item.percentage}% of total</p>
                    </div>
                    <p className="font-bold">{formatCurrency(item.amount)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectDetails.revenue_model.map((model, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">{model.type}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{model.description}</p>
                    <p className="text-sm font-medium">
                      Price Range: {formatCurrency(model.price_range[0])} - {formatCurrency(model.price_range[1])} per kg
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {projectDetails.market_opportunity}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectDetails.competitive_advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{advantage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartColumnIncreasing className="h-5 w-5" />
                Financial Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projectDetails.financial_projections.map((projection, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Year {projection.year}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-lg font-semibold">{formatCurrency(projection.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expenses</p>
                        <p className="text-lg font-semibold">{formatCurrency(projection.operating_expenses)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Profit</p>
                        <p className="text-lg font-semibold text-success">{formatCurrency(projection.net_profit)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="text-lg font-semibold text-success">{formatPercentage(projection.roi)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <h4 className="font-semibold text-success mb-2">Key Milestones</h4>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Break-even Point:</span> {projectDetails.breakeven_point}</p>
                  <p className="text-sm"><span className="font-medium">Full ROI Period:</span> {projectDetails.full_roi_period}</p>
                  <p className="text-sm"><span className="font-medium">Annual Return Range:</span> {formatPercentage(projectDetails.annual_return_range[0])} - {formatPercentage(projectDetails.annual_return_range[1])}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Social and Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Social Benefits
                  </h4>
                  <div className="space-y-3">
                    {projectDetails.social_impact.filter(impact => 
                      impact.includes('job') || impact.includes('communities') || impact.includes('affordable')
                    ).map((impact, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Environmental Benefits
                  </h4>
                  <div className="space-y-3">
                    {projectDetails.social_impact.filter(impact => 
                      impact.includes('waste') || impact.includes('deforestation') || impact.includes('sustainable')
                    ).map((impact, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailsView;