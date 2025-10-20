import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, Check, Chrome, Apple } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";

const Install = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <>
      <PreloadAnimation type="home" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <div className="min-h-screen bg-background py-20 px-4 pt-24">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block mb-6"
                >
                  <Smartphone className="h-20 w-20 text-primary drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
                  Install NextStep
                </h1>
                <p className="text-xl text-muted-foreground">
                  Access your career roadmaps anytime, anywhere
                </p>
              </motion.div>

              {/* Installation Status */}
              {isInstalled ? (
                <AnimatedCard glowColor="rgba(34, 197, 94, 0.8)">
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.8 }}
                    >
                      <Check className="h-16 w-16 text-green-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">App Installed!</h2>
                    <p className="text-muted-foreground">
                      NextStep is now installed on your device
                    </p>
                  </div>
                </AnimatedCard>
              ) : (
                <>
                  {/* Install Button */}
                  {deferredPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
                        <div className="p-8 text-center">
                          <Button
                            size="lg"
                            onClick={handleInstall}
                            className="text-lg px-8 py-6 glow-blue"
                          >
                            <Download className="mr-2 h-6 w-6" />
                            Install App Now
                          </Button>
                          <p className="text-sm text-muted-foreground mt-4">
                            Works offline • Fast loading • Native experience
                          </p>
                        </div>
                      </AnimatedCard>
                    </motion.div>
                  )}

                  {/* Manual Installation Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chrome/Android */}
                    <AnimatedCard glowColor="rgba(34, 197, 94, 0.8)">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Chrome className="h-8 w-8 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                          <h3 className="text-2xl font-bold">Chrome / Android</h3>
                        </div>
                        <ol className="space-y-3 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">1.</span>
                            <span>Tap the menu icon (⋮) in the browser</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">2.</span>
                            <span>Select "Install app" or "Add to Home screen"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">3.</span>
                            <span>Confirm by tapping "Install"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">4.</span>
                            <span>Find the NextStep icon on your home screen</span>
                          </li>
                        </ol>
                      </div>
                    </AnimatedCard>

                    {/* Safari/iOS */}
                    <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Apple className="h-8 w-8 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                          <h3 className="text-2xl font-bold">Safari / iPhone</h3>
                        </div>
                        <ol className="space-y-3 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">1.</span>
                            <span>Tap the Share button (
                              <svg className="inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                              </svg>
                              )
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">2.</span>
                            <span>Scroll down and tap "Add to Home Screen"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">3.</span>
                            <span>Edit the name if desired and tap "Add"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-bold text-primary">4.</span>
                            <span>Launch NextStep from your home screen</span>
                          </li>
                        </ol>
                      </div>
                    </AnimatedCard>
                  </div>
                </>
              )}

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <AnimatedCard glowColor="rgba(168, 85, 247, 0.8)">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      Why Install NextStep?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: "Offline Access", desc: "Access roadmaps without internet", icon: "📱" },
                        { title: "Fast Loading", desc: "Instant app-like performance", icon: "⚡" },
                        { title: "Native Feel", desc: "Feels like a real mobile app", icon: "✨" },
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-4xl mb-3">{benefit.icon}</div>
                          <h3 className="font-bold mb-2">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            </div>
          </div>
        </PageTransition>
      )}
    </>
  );
};

export default Install;
