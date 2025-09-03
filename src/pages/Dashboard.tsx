import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/contexts/AuthContext";
import { Building2, TrendingUp, Wallet, Settings, BarChart3, DollarSign } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import InvestmentModal from "@/components/investment/InvestmentModal";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Investment {
  id: number;
  name: string;
  amount: number;
  currentValue: number;
  status: string;
}

interface Stats {
  totalInvested: number;
  currentValue: number;
  profit: number;
  profitPercentage: number;
}

const Dashboard = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<Stats>({
    totalInvested: 0,
    currentValue: 0,
    profit: 0,
    profitPercentage: 0,
  });
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch profile data for stats
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('total_invested, total_profit')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch investments
      const { data: investmentData, error: investmentError } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (investmentError) throw investmentError;

      const calculatedCurrentValue = (profile?.total_invested || 0) + (profile?.total_profit || 0);
      const profitPercentage = profile?.total_invested > 0 ? ((profile?.total_profit || 0) / profile.total_invested) * 100 : 0;

      setStats({
        totalInvested: profile?.total_invested || 0,
        currentValue: calculatedCurrentValue,
        profit: profile?.total_profit || 0,
        profitPercentage: profitPercentage,
      });

      // The 'name' and 'currentValue' are not in the investment table, so I'll mock them for now.
      // You might want to adjust your table or join with a projects table.
      const formattedInvestments = investmentData.map(inv => ({
        id: inv.id,
        name: inv.korapay_reference || "Tech Growth Fund", // Using reference as a placeholder name
        amount: inv.amount,
        currentValue: inv.amount, // Placeholder, you'll need to calculate this
        status: inv.status,
      }));
      setInvestments(formattedInvestments);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Could not fetch dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (searchParams.get('investment') === 'success') {
      toast({
        title: "Payment Successful!",
        description: "Your investment has been confirmed.",
      });
      fetchDashboardData(); // Refresh data
      // Clean up URL
      searchParams.delete('investment');
      setSearchParams(searchParams);
    }
  }, [searchParams, user]);


  const mockInvestments = [
    { id: 1, name: "Tech Growth Fund", amount: 10000, currentValue: 11200, status: "active" },
    { id: 2, name: "Real Estate Portfolio", amount: 8000, currentValue: 8400, status: "active" },
    { id: 3, name: "Green Energy Bonds", amount: 7000, currentValue: 7900, status: "active" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">RehobothBank</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Investment Dashboard</h1>
          <p className="text-muted-foreground">Track your investments and portfolio performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalInvested.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.currentValue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+${stats.profit.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+{stats.profitPercentage.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Investments</CardTitle>
              <InvestmentModal onInvestmentSuccess={fetchDashboardData} />
            </div>
            <CardDescription>
              A list of your current and past investments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-6 py-3">Investment</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Current Value</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4">
                          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="h-6 w-16 mx-auto bg-muted rounded-full animate-pulse"></div>
                        </td>
                      </tr>
                    ))
                  ) : investments.length > 0 ? (
                    investments.map((investment) => (
                      <tr key={investment.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium text-foreground">{investment.name}</td>
                        <td className="px-6 py-4">${investment.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">${investment.currentValue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                            {investment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-muted-foreground">
                        You have no investments yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;