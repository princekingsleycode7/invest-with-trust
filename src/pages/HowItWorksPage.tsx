import { Building2, UserPlus, Search, TrendingUp, DollarSign, Shield, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up for a free RehobothBank account and complete your profile verification to get started with investing.",
      details: [
        "Simple registration process",
        "KYC verification for security",
        "Access to investment dashboard"
      ]
    },
    {
      icon: Search,
      title: "Browse Investment Projects",
      description: "Explore our carefully vetted agricultural and manufacturing projects with detailed financial projections.",
      details: [
        "Detailed project information",
        "Financial projections and ROI",
        "Risk assessment reports"
      ]
    },
    {
      icon: TrendingUp,
      title: "Make Your Investment",
      description: "Choose your investment amount and complete the secure payment process through our trusted payment partners.",
      details: [
        "Flexible investment amounts",
        "Secure payment processing",
        "Instant investment confirmation"
      ]
    },
    {
      icon: DollarSign,
      title: "Earn Returns",
      description: "Monitor your investments and receive returns based on project performance and agreed payment schedules.",
      details: [
        "Real-time investment tracking",
        "Regular return payments",
        "Transparent reporting"
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Bank-level security with encrypted transactions and secure data storage."
    },
    {
      icon: Clock,
      title: "Flexible Terms",
      description: "Choose from various investment periods ranging from 6 months to 5 years."
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor your portfolio performance with detailed analytics and reporting."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How RehobothBank Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our simple 4-step process makes it easy to start investing in high-potential 
            agricultural and manufacturing projects with confidence.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Today
            </Button>
          </Link>
        </section>

        {/* Steps Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Your Investment Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose RehobothBank?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Types Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Investment Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Agricultural Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Crop farming and livestock projects</li>
                  <li>• Seasonal and perennial crop investments</li>
                  <li>• Modern farming equipment financing</li>
                  <li>• Agro-processing ventures</li>
                  <li>• Expected returns: 15-25% annually</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Manufacturing Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Small to medium-scale manufacturing</li>
                  <li>• Food processing and packaging</li>
                  <li>• Textile and garment production</li>
                  <li>• Industrial equipment investments</li>
                  <li>• Expected returns: 18-30% annually</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are building wealth through our 
            carefully vetted investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create Account
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline">
                View Projects
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;