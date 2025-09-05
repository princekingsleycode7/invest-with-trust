import { Building2, Target, Users, Award, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We maintain the highest standards of transparency in all our investment operations, providing clear and honest communication."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in project selection, risk management, and investor relations to deliver superior returns."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Our investments focus on projects that create positive economic and social impact in local communities."
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description: "We prioritize long-term sustainable growth over short-term gains, ensuring lasting value for all stakeholders."
    }
  ];

  const team = [
    {
      name: "David Rehoboth",
      position: "Founder & CEO",
      description: "15+ years in agricultural finance and investment management"
    },
    {
      name: "Sarah Johnson",
      position: "Head of Investment",
      description: "Former investment banker with expertise in emerging markets"
    },
    {
      name: "Michael Chen",
      position: "Risk Management",
      description: "Risk assessment specialist with agricultural sector focus"
    },
    {
      name: "Grace Okonkwo",
      position: "Operations Director",
      description: "Operations expert with background in fintech and banking"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "₦2.5 Billion",
      description: "Total investments facilitated"
    },
    {
      icon: Users,
      title: "5,000+",
      description: "Active investors"
    },
    {
      icon: TrendingUp,
      title: "22%",
      description: "Average annual returns"
    },
    {
      icon: Building2,
      title: "150+",
      description: "Successful projects"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About RehobothBank
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We are pioneering the future of agricultural and manufacturing investments, 
            connecting investors with high-potential projects that drive economic growth 
            and create lasting value.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize access to high-quality investment opportunities in agriculture 
                and manufacturing, while empowering entrepreneurs with the capital they need 
                to build successful, sustainable businesses.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that by connecting investors with carefully vetted projects, 
                we can create a positive impact on both financial returns and community development.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <achievement.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg mb-6">
                RehobothBank was founded in 2019 with a simple yet powerful vision: to bridge 
                the gap between investors seeking reliable returns and entrepreneurs in agriculture 
                and manufacturing who need capital to grow their businesses.
              </p>
              <p className="text-lg mb-6">
                Our founder, David Rehoboth, recognized that traditional financing often overlooks 
                the immense potential in Nigeria's agricultural and manufacturing sectors. With over 
                15 years of experience in agricultural finance, he assembled a team of experts to 
                create a platform that would unlock this potential.
              </p>
              <p className="text-lg mb-6">
                Since our inception, we have facilitated over ₦2.5 billion in investments, 
                supporting more than 150 successful projects and creating thousands of jobs 
                across Nigeria. Our rigorous project selection process and ongoing monitoring 
                have resulted in an average annual return of 22% for our investors.
              </p>
              <p className="text-lg">
                Today, RehobothBank stands as a trusted partner for both investors and entrepreneurs, 
                continuing to expand access to investment opportunities while maintaining our 
                commitment to transparency, sustainability, and community impact.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Focus Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Investment Focus
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Agricultural Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Crop Production</h4>
                    <p className="text-muted-foreground text-sm">
                      Rice, maize, cassava, yam, and other staple crops with guaranteed off-take agreements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Livestock & Aquaculture</h4>
                    <p className="text-muted-foreground text-sm">
                      Poultry, cattle, fish farming, and other livestock projects with proven market demand.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Agro-processing</h4>
                    <p className="text-muted-foreground text-sm">
                      Food processing, packaging, and value-addition projects that increase farm gate prices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Manufacturing Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Food & Beverages</h4>
                    <p className="text-muted-foreground text-sm">
                      Processing plants for local and export markets with established distribution channels.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Textiles & Garments</h4>
                    <p className="text-muted-foreground text-sm">
                      Small to medium-scale textile production and garment manufacturing facilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Industrial Equipment</h4>
                    <p className="text-muted-foreground text-sm">
                      Manufacturing of agricultural tools, machinery, and other industrial equipment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of a community that's transforming Nigeria's economy through 
            strategic investments in agriculture and manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Investing
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline">
                View Opportunities
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;