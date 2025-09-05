import { useState, useEffect } from "react";
import { Building2, Users, TrendingUp, Download, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const { user } = useAuthContext();
  const { isAdmin, loading } = useAdmin();
  const [users, setUsers] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    totalInvested: 0,
    activeProjects: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      // Fetch users with their profiles
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Fetch all investments with project info
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('investments')
        .select(`
          *,
          profiles!inner(full_name),
          projects(name)
        `)
        .order('created_at', { ascending: false });

      if (investmentsError) throw investmentsError;

      // Fetch projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (projectsError) throw projectsError;

      setUsers(usersData || []);
      setInvestments(investmentsData || []);
      
      // Calculate stats
      const totalInvested = (investmentsData || [])
        .filter(inv => inv.status === 'active')
        .reduce((sum, inv) => sum + inv.amount, 0);

      setStats({
        totalUsers: usersData?.length || 0,
        totalInvestments: investmentsData?.length || 0,
        totalInvested,
        activeProjects: projectsCount || 0
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    }
  };

  const downloadReport = () => {
    const csvContent = [
      ['User ID', 'Full Name', 'Total Invested', 'Investment Count', 'Created At'],
      ...users.map(user => {
        const userInvestments = investments.filter(inv => inv.user_id === user.user_id);
        const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
        return [
          user.user_id,
          user.full_name || 'N/A',
          totalInvested,
          userInvestments.length,
          user.created_at
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rehoboth-bank-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">RehobothBank Admin</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Button onClick={downloadReport} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{stats.totalInvested.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Overview of all registered users and their investment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Total Invested</TableHead>
                  <TableHead>Investment Count</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const userInvestments = investments.filter(inv => inv.user_id === user.user_id);
                  const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                      <TableCell>₦{totalInvested.toLocaleString()}</TableCell>
                      <TableCell>{userInvestments.length}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.verification_status === 'verified' ? 'default' : 'secondary'}>
                          {user.verification_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Investments</CardTitle>
            <CardDescription>Complete list of all investment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell className="font-medium">
                      {investment.profiles?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>{investment.projects?.name || 'N/A'}</TableCell>
                    <TableCell>₦{investment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(investment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={investment.status === 'active' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{investment.reference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;