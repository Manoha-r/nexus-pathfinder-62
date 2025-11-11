import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@nextstep.com",
      link: "mailto:support@nextstep.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "#",
    },
  ];

  return (
    <>
      <PreloadAnimation type="contact" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <AnimatedBackground />
          <div className="min-h-screen bg-background py-20 px-4 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We're here to help you on your career journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full group">
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                </form>
              </div>
            </AnimatedCard>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="block"
                >
                  <AnimatedCard>
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center"
                        >
                          <info.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.title}</p>
                          <p className="text-lg font-semibold">{info.value}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.a>
              ))}

              <AnimatedCard glowColor="rgba(34, 197, 94, 0.8)">
                <div className="p-8 mt-8">
                  <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
                  <p className="text-muted-foreground">
                    Our team typically responds within 24 hours. For urgent matters,
                    please call us directly.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
      </div>
        </PageTransition>
      )}
    </>
  );
};

export default Contact;