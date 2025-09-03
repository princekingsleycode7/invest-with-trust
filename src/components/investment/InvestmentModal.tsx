import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const InvestmentModal = ({ project, onInvestmentSuccess }: { project?: any, onInvestmentSuccess?: () => void }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleInvest = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-investment', {
        body: {
          amount: parseFloat(amount),
          currency: 'NGN', // Assuming NGN for now
          project_id: project?.id
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success && data?.checkout_url) {
        // Open Korapay checkout in a new tab
        window.open(data.checkout_url, '_blank');
        setOpen(false);
        toast({
          title: "Investment Initiated",
          description: "Complete your payment in the new tab to confirm your investment",
        });
        if (onInvestmentSuccess) onInvestmentSuccess();
      } else {
        throw new Error('Failed to create investment session');
      }
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: "Investment Failed",
        description: error.message || "Failed to create investment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 w-full">
          <TrendingUp className="h-4 w-4" />
          {project ? "Invest in Project" : "Make Investment"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{project ? `Invest in ${project.name}` : 'New Investment'}</DialogTitle>
          <DialogDescription>
            {project ? `You are investing in ${project.name}.` : "Enter the amount you'd like to invest."} You'll be redirected to Korapay to complete the payment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {project && (
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Target</span>
                  <span className="text-sm font-bold">${project.target_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Raised</span>
                  <span className="text-sm font-bold">${project.current_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount (NGN)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                min="1"
                step="0.01"
              />
            </div>
          </div>
          
          <Button onClick={handleInvest} disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;