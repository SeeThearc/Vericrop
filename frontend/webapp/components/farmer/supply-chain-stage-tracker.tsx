"use client";
import { motion } from "motion/react";
import {
  Sprout,
  Scissors,
  Factory,
  Truck,
  Store,
  CheckCircle,
  Clock,
  User,
  Calendar,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";

interface StageData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "completed" | "current" | "pending";
  timestamp?: string;
  handler?: string;
  location?: string;
  duration?: string;
  details?: string;
  transactionHash?: string;
}

interface SupplyChainStageTrackerProps {
  productId: string;
  stages: StageData[];
  onStageClick?: (stageId: string) => void;
  showDetails?: boolean;
}

export const SupplyChainStageTracker = ({
  stages,
  onStageClick,
}: SupplyChainStageTrackerProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState(false);

  const getStageColor = (status: StageData["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500 text-white";
      case "current":
        return "bg-blue-500 border-blue-500 text-white animate-pulse";
      case "pending":
        return "bg-gray-200 border-gray-300 text-gray-500";
    }
  };

  const getConnectionColor = (
    currentStatus: StageData["status"],
    nextStatus: StageData["status"]
  ) => {
    if (currentStatus === "completed") return "bg-green-500";
    if (currentStatus === "current" && nextStatus === "pending")
      return "bg-gradient-to-r from-blue-500 to-gray-200";
    return "bg-gray-200";
  };

  const currentStageIndex = stages.findIndex(
    (stage) => stage.status === "current"
  );
  const completedStages = stages.filter(
    (stage) => stage.status === "completed"
  ).length;
  const progress =
    ((completedStages + (currentStageIndex >= 0 ? 0.5 : 0)) / stages.length) *
    100;

  const defaultStages: StageData[] = [
    {
      id: "farm",
      name: "Farm",
      icon: Sprout,
      status: "current",
      timestamp: "2024-01-15",
      handler: "John Farmer",
      location: "Farm A1",
    },
    {
      id: "harvest",
      name: "Harvested",
      icon: Scissors,
      status: "pending",
    },
    {
      id: "processing",
      name: "Processing",
      icon: Factory,
      status: "pending",
    },
    {
      id: "distribution",
      name: "Distribution",
      icon: Truck,
      status: "pending",
    },
    {
      id: "retail",
      name: "Retail",
      icon: Store,
      status: "pending",
    },
  ];

  // Use provided stages or fall back to defaults
  const stageData = stages.length > 0 ? stages : defaultStages;

  const handleStageClick = (stage: StageData) => {
    setSelectedStage(selectedStage === stage.id ? null : stage.id);
    onStageClick?.(stage.id);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              Supply Chain Progress
            </h3>
            <Badge variant="outline" className="bg-white">
              {completedStages}/{stages.length} Stages
            </Badge>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-gray-600 mt-1 block">
              {progress.toFixed(0)}% Complete
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Stage Timeline */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Supply Chain Journey
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="text-gray-600"
            >
              {expandedDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Container */}
              <div className="flex items-center justify-between relative">
                {stageData.map((stage, index) => (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center relative z-10 flex-1"
                  >
                    {/* Stage Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <button
                        onClick={() => handleStageClick(stage)}
                        className={`
                          w-16 h-16 rounded-full border-4 flex items-center justify-center
                          transition-all duration-300 hover:scale-110 cursor-pointer
                          ${getStageColor(stage.status)}
                          ${
                            selectedStage === stage.id
                              ? "ring-4 ring-blue-200"
                              : ""
                          }
                        `}
                      >
                        <stage.icon className="h-6 w-6" />
                      </button>

                      {/* Status Indicator */}
                      {stage.status === "completed" && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}

                      {stage.status === "current" && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </motion.div>

                    {/* Stage Label */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="mt-3 text-center"
                    >
                      <div
                        className={`text-sm font-medium ${
                          stage.status === "completed"
                            ? "text-green-700"
                            : stage.status === "current"
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {stage.name}
                      </div>
                      {stage.timestamp && (
                        <div className="text-xs text-gray-500 mt-1">
                          {stage.timestamp}
                        </div>
                      )}
                    </motion.div>

                    {/* Connection Line to Next Stage */}
                    {index < stageData.length - 1 && (
                      <div
                        className={`absolute top-8 left-1/2 w-full h-1 transform -translate-y-1/2 translate-x-1/2 ${getConnectionColor(
                          stage.status,
                          stageData[index + 1].status
                        )}`}
                        style={{ width: "calc(100% - 2rem)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {stageData.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <button
                  onClick={() => handleStageClick(stage)}
                  className={`
                    w-12 h-12 rounded-full border-3 flex items-center justify-center
                    transition-all duration-300 cursor-pointer flex-shrink-0
                    ${getStageColor(stage.status)}
                    ${selectedStage === stage.id ? "ring-2 ring-blue-200" : ""}
                  `}
                >
                  <stage.icon className="h-5 w-5" />
                </button>

                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium ${
                      stage.status === "completed"
                        ? "text-green-700"
                        : stage.status === "current"
                        ? "text-blue-700"
                        : "text-gray-500"
                    }`}
                  >
                    {stage.name}
                  </div>
                  {stage.timestamp && (
                    <div className="text-xs text-gray-500">
                      {stage.timestamp}
                    </div>
                  )}
                </div>

                {/* Vertical Connection */}
                {index < stageData.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-4 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Expanded Stage Details */}
          {expandedDetails && selectedStage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t"
            >
              {(() => {
                const stage = stageData.find((s) => s.id === selectedStage);
                if (!stage) return null;

                return (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <stage.icon className="h-5 w-5" />
                      {stage.name} Stage Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {stage.timestamp && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{stage.timestamp}</span>
                        </div>
                      )}

                      {stage.handler && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Handler:</span>
                          <span className="font-medium">{stage.handler}</span>
                        </div>
                      )}

                      {stage.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{stage.location}</span>
                        </div>
                      )}
                    </div>

                    {stage.details && (
                      <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-700">{stage.details}</p>
                      </div>
                    )}

                    {stage.transactionHash && (
                      <div className="mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(
                              `#/tx/${stage.transactionHash}`,
                              "_blank"
                            )
                          }
                          className="text-xs"
                        >
                          View Transaction:{" "}
                          {stage.transactionHash?.slice(0, 10)}...
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
