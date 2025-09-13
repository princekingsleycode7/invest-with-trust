import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProjects from "@/components/landing/FeaturedProjects";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedProjects />
      <Footer />
    </div>
  );
};

export default Index;
