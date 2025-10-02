import { useState } from "react";
import { Building2, Mail, Phone, MapPin, MessageCircle, Send, User, MessageSquare, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { streamChat } from "@/utils/chatStream";

type Message = { role: "user" | "assistant"; content: string };

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    const userMsg: Message = { role: "user", content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";
    
    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.role === "assistant") {
              return prev.map((m, i) => 
                i === prev.length - 1 ? { ...m, content: assistantContent } : m
              );
            }
            return [...prev, { role: "assistant", content: assistantContent }];
          });
        },
        onDone: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@rehobothbank.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+234 (0) 801 234 5678",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Lagos, Nigeria",
      description: "Visit our headquarters"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Have questions about our investment opportunities? Need help with your account? 
            We're here to help. Reach out to us through any of the channels below.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-foreground">{info.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Methods */}
        <section className="max-w-4xl mx-auto">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Form
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                AI Chat Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    AI Chat Assistant
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to your questions about RehobothBank and our services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 border rounded-lg p-4 mb-4 overflow-y-auto space-y-4 bg-muted/5">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-12">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">Start a conversation with our AI assistant</p>
                        <p className="text-sm mt-2">Ask about our investment opportunities, projects, or how to get started</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {msg.role === "assistant" && (
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.role === "user" && (
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                <User className="h-5 w-5 text-secondary-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                          <div className="flex gap-3 justify-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <Bot className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="bg-muted rounded-lg px-4 py-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !chatInput.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I start investing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply create an account, complete the verification process, and browse our available projects. You can start investing with as little as ₦50,000.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the expected returns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our projects typically offer returns between 15-30% annually, depending on the project type and duration. Past performance is not a guarantee of future results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How are projects vetted?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We conduct thorough due diligence including financial analysis, market assessment, management evaluation, and risk assessment before approving any project.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I withdraw my investment early?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Investment terms vary by project. Some offer flexible withdrawal options while others have fixed terms. Check the project details before investing.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;