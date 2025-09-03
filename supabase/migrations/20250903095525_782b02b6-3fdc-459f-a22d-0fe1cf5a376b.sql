-- Create investments table to track user investments
CREATE TABLE public.investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    reference TEXT UNIQUE NOT NULL,
    korapay_reference TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    investment_type TEXT DEFAULT 'general',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- Create policies for investments
CREATE POLICY "Users can view their own investments" 
ON public.investments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert investments" 
ON public.investments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can update investments" 
ON public.investments 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_investments_updated_at
BEFORE UPDATE ON public.investments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_investments_user_id ON public.investments(user_id);
CREATE INDEX idx_investments_reference ON public.investments(reference);
CREATE INDEX idx_investments_status ON public.investments(status);