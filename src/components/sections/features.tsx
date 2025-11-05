"use client";
import { useState, useEffect, useRef } from "react";
import { Shield, Database, AlertTriangle, Car, FileText, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  status: "active" | "premium" | "coming-soon";
  accuracy: number;
  relatedIds: number[];
}

export function Features() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const features: FeatureItem[] = [
    {
      id: 1,
      title: "Theft Prevention",
      description: "Real-time checks against Ghana Police Service database to identify stolen vehicles instantly",
      icon: Shield,
      category: "Security",
      status: "active",
      accuracy: 99,
      relatedIds: [2, 6]
    },
    {
      id: 2,
      title: "DVLA Integration",
      description: "Direct access to official vehicle registration data from Ghana's Driver and Vehicle Licensing Authority",
      icon: Database,
      category: "Official Data",
      status: "active",
      accuracy: 98,
      relatedIds: [1, 3]
    },
    {
      id: 3,
      title: "Fraud Detection",
      description: "Advanced algorithms to detect VIN tampering, cloning, and other fraudulent activities",
      icon: AlertTriangle,
      category: "AI Detection",
      status: "premium",
      accuracy: 95,
      relatedIds: [2, 4]
    },
    {
      id: 4,
      title: "VIN Decoding",
      description: "Comprehensive 17-character VIN decoding with detailed vehicle specifications and history",
      icon: Car,
      category: "Analysis",
      status: "active",
      accuracy: 97,
      relatedIds: [3, 5]
    },
    {
      id: 5,
      title: "License Plate Lookup",
      description: "Ghana license plate verification with regional code support and theft status checking",
      icon: FileText,
      category: "Verification",
      status: "active",
      accuracy: 96,
      relatedIds: [4, 6]
    },
    {
      id: 6,
      title: "Ownership History",
      description: "Complete ownership records, transfer history, and previous registration details",
      icon: Users,
      category: "Records",
      status: "premium",
      accuracy: 94,
      relatedIds: [5, 1]
    }
  ];

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: number;

    if (autoRotate) {
      rotationTimer = window.setInterval(() => {
        setRotationAngle((prev) => (prev + 0.2) % 360);
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 
                   typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 250;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.6, Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = features.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: FeatureItem["status"]): string => {
    switch (status) {
      case "active":
        return "text-white bg-secondary-orange border-secondary-orange";
      case "premium":
        return "text-white bg-primary-red border-primary-red";
      case "coming-soon":
        return "text-gray-600 bg-gray-200 border-gray-300";
      default:
        return "text-gray-600 bg-gray-200 border-gray-300";
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-18 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 text-white">
            Comprehensive Vehicle Verification and Service History
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto px-4 sm:px-0">
            Our platform provides multiple layers of verification to ensure vehicle authenticity and prevent fraud across Ghana
          </p>
        </div>

        <div
          className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center mt-8 "
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Center Hub */}
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-secondary-orange via-primary-red to-secondary-orange animate-pulse flex items-center justify-center z-10">
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-white/20 animate-ping opacity-70"></div>
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
              </div>
            </div>

            {/* Orbital Ring */}
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-white/10"></div>

            {/* Feature Nodes */}
            {features.map((feature, index) => {
              const position = calculateNodePosition(index, features.length);
              const isExpanded = expandedItems[feature.id];
              const isRelated = isRelatedToActive(feature.id);
              const isPulsing = pulseEffect[feature.id];
              const Icon = feature.icon;

              const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
              const nodeStyle = {
                transform: `translate(${position.x * (isMobile ? 0.9 : 1)}px, ${position.y * (isMobile ? 0.9 :1)}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    nodeRefs.current[feature.id] = el;
                  }}
                  className="absolute transition-all duration-700 cursor-pointer"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(feature.id);
                  }}
                >
                  {/* Pulse Effect */}
                  <div
                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                    style={{
                      background: `radial-gradient(circle, rgba(251,140,0,0.2) 30%, rgba(251,140,0,0) 20%)`,
                      width: `${(feature.accuracy * 0.6 + 50) * (isMobile ? 0.7 : 1)}px`,
                      height: `${(feature.accuracy * 0.6 + 50) * (isMobile ? 0.7 : 1)}px`,
                      left: `-${((feature.accuracy * 0.6 + 50) * (isMobile ? 0.7 : 1) - (isMobile ? 35 : 50)) / 2}px`,
                      top: `-${((feature.accuracy * 0.6 + 50) * (isMobile ? 0.7 : 1) - (isMobile ? 35 : 50)) / 2}px`,
                    }}
                  ></div>

                  {/* Node */}
                  <div
                    className={`
                    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                    ${isExpanded ? "bg-white text-gray-800" : isRelated ? "bg-secondary-orange text-white" : "bg-gray-800 text-white"}
                    border-2 
                    ${isExpanded ? "border-white shadow-lg shadow-white/30" : isRelated ? "border-secondary-orange animate-pulse" : "border-white/40"}
                    transition-all duration-300 transform
                    ${isExpanded ? "scale-125" : ""}
                  `}
                  >
                    <Icon size={isMobile ? 14 : typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 20} />
                  </div>

                  {/* Node Label */}
                  <div
                    className={`
                    absolute top-10 sm:top-12 md:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs sm:text-sm font-semibold tracking-wider text-center
                    transition-all duration-300
                    ${isExpanded ? "text-white scale-110" : "text-white/80"}
                  `}
                  >
                    <span className="hidden sm:inline">{feature.title}</span>
                    <span className="sm:hidden">{feature.title.split(' ')[0]}</span>
                  </div>

                  {/* Expanded Card */}
                  {isExpanded && (
                    <Card className={`absolute left-1/2 -translate-x-1/2 w-64 sm:w-72 md:w-80 bg-gray-900/95 backdrop-blur-lg border-white/30 shadow-xl shadow-black/50 text-white ${
                      position.y > 100 ? 'bottom-16 sm:bottom-20 md:bottom-24' : position.y < -100 ? 'top-16 sm:top-20 md:top-24' : 'top-16 sm:top-20 md:top-24'
                    }`}>
                      <div className={`absolute left-1/2 -translate-x-1/2 w-px h-3 bg-white/50 ${
                        position.y > 100 ? 'top-3' : 'bottom-3'
                      }`}></div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center mb-2">
                          <Badge className={`px-2 text-xs ${getStatusStyles(feature.status)}`}>
                            {feature.status === "active" ? "ACTIVE" : feature.status === "premium" ? "PREMIUM" : "COMING SOON"}
                          </Badge>
                          <span className="text-xs font-mono text-white/60">
                            {feature.category}
                          </span>
                        </div>
                        <CardTitle className="text-sm sm:text-base text-white">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs sm:text-sm text-white/90">
                        <p className="leading-relaxed">{feature.description}</p>

                        <div className="mt-4 pt-3 border-t border-white/20">
                          <div className="flex justify-between items-center text-xs mb-2">
                            <span className="flex items-center text-white/80">
                              <Shield size={10} className="mr-1" />
                              Accuracy Rate
                            </span>
                            <span className="font-mono text-white">{feature.accuracy}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-secondary-orange to-primary-red"
                              style={{ width: `${feature.accuracy}%` }}
                            ></div>
                          </div>
                        </div>

                        {feature.relatedIds.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-white/20">
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/80 mb-2">
                              Connected Features
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {feature.relatedIds.map((relatedId) => {
                                const relatedItem = features.find((i) => i.id === relatedId);
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 py-0 text-xs border-white/30 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    <span className="hidden sm:inline">{relatedItem?.title}</span>
                                    <span className="sm:hidden">{relatedItem?.title.split(' ')[0]}</span>
                                    <ArrowRight size={8} className="ml-1" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
