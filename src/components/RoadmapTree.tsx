import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";

interface Resource {
  title: string;
  url: string;
}

interface RoadmapItem {
  name: string;
  resources: Resource[];
}

interface RoadmapStep {
  title: string;
  duration: string;
  items: RoadmapItem[];
}

interface RoadmapTreeProps {
  steps: RoadmapStep[];
  completedSteps: number[];
  onToggleStep: (stepIndex: number) => void;
}

const RoadmapTree = ({ steps, completedSteps, onToggleStep }: RoadmapTreeProps) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);

  const toggleExpand = (stepIndex: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

      <div className="space-y-8">
        {steps.map((step, stepIndex) => {
          const isCompleted = completedSteps.includes(stepIndex);
          const isExpanded = expandedSteps.includes(stepIndex);
          const isLast = stepIndex === steps.length - 1;

          return (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stepIndex * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Node Circle */}
              <motion.button
                onClick={() => onToggleStep(stepIndex)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-6 z-10 flex-shrink-0"
              >
                <motion.div
                  animate={{
                    scale: isCompleted ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ repeat: isCompleted ? 0 : Infinity, duration: 2 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-16 w-16 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  ) : (
                    <Circle className="h-16 w-16 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  )}
                </motion.div>
              </motion.button>

              {/* Connector to Card */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: stepIndex * 0.15 + 0.3, duration: 0.5 }}
                className="absolute left-16 top-14 w-12 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
              />

              {/* Step Card */}
              <div className="ml-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stepIndex * 0.15 + 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`p-6 transition-all duration-300 ${
                    isCompleted 
                      ? "bg-green-500/10 border-green-500/30" 
                      : "bg-card/80 backdrop-blur-sm hover:shadow-2xl"
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <Badge 
                          variant={isCompleted ? "default" : "outline"}
                          className="mb-2"
                        >
                          {step.duration}
                        </Badge>
                      </div>
                      <motion.button
                        onClick={() => toggleExpand(stepIndex)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-4 p-2 hover:bg-accent rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </motion.button>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-4">
                        {step.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                            transition={{ delay: itemIndex * 0.1 }}
                            className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors"
                          >
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              {item.name}
                            </h4>
                            <div className="space-y-2">
                              {item.resources.map((resource, resIndex) => (
                                <motion.a
                                  key={resIndex}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ x: 5 }}
                                  className="flex items-center gap-2 text-sm text-primary hover:underline group"
                                >
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </motion.div>
                                  {resource.title}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>

                {/* Progress Line to Next Step */}
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: stepIndex * 0.15 + 0.6, duration: 0.5 }}
                    className="ml-[-4.5rem] mt-4 mb-4 w-0.5 h-12 bg-gradient-to-b from-accent to-transparent origin-top"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTree;