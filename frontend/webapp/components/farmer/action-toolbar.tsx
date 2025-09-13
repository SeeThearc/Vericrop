"use client";
import { motion } from "motion/react";
import {
  Plus,
  Upload,
  Send,
  ExternalLink,
  Shield,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { useState } from "react";

interface ActionToolbarProps {
  isRegistered: boolean;
  onRegisterFarmer?: () => void;
  onCreateProduct?: () => void;
  onUploadIPFS?: () => void;
  onTransferProduct?: () => void;
  onViewExplorer?: () => void;
  pendingTransactions?: number;
}

export const ActionToolbar = ({
  isRegistered,
  onRegisterFarmer,
  onCreateProduct,
  onUploadIPFS,
  onTransferProduct,
  onViewExplorer,
  pendingTransactions = 0,
}: ActionToolbarProps) => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAction = async (actionKey: string, callback?: () => void) => {
    if (!callback) return;

    setLoadingStates((prev) => ({ ...prev, [actionKey]: true }));

    try {
      await callback();
    } catch (error) {
      console.error(`Error executing ${actionKey}:`, error);
    } finally {
      // Simulate async operation
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [actionKey]: false }));
      }, 1000);
    }
  };

  const actions = [
    // Registration action (only show if not registered)
    ...(!isRegistered
      ? [
          {
            key: "register",
            label: "Register as Farmer",
            icon: Shield,
            onClick: () => handleAction("register", onRegisterFarmer),
            variant: "default" as const,
            className:
              "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0",
            description: "Complete your farmer registration on the blockchain",
            priority: "high" as const,
          },
        ]
      : []),

    // Core blockchain actions
    {
      key: "create",
      label: "Create New Product",
      icon: Plus,
      onClick: () => handleAction("create", onCreateProduct),
      variant: "default" as const,
      className:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0",
      description: "Register a new agricultural product on the blockchain",
      priority: "high" as const,
      disabled: !isRegistered,
    },
    {
      key: "upload",
      label: "Upload to IPFS",
      icon: Upload,
      onClick: () => handleAction("upload", onUploadIPFS),
      variant: "outline" as const,
      className:
        "border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300",
      description: "Upload additional product documentation to IPFS",
      priority: "medium" as const,
      disabled: !isRegistered,
    },
    {
      key: "transfer",
      label: "Transfer to Distributor",
      icon: Send,
      onClick: () => handleAction("transfer", onTransferProduct),
      variant: "outline" as const,
      className:
        "border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300",
      description: "Transfer product ownership to a distributor",
      priority: "medium" as const,
      disabled: !isRegistered,
    },
    {
      key: "explorer",
      label: "Blockchain Explorer",
      icon: ExternalLink,
      onClick: () => handleAction("explorer", onViewExplorer),
      variant: "ghost" as const,
      className: "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
      description: "View your transactions on the blockchain explorer",
      priority: "low" as const,
    },
  ];

  const highPriorityActions = actions.filter(
    (action) => action.priority === "high"
  );
  const mediumPriorityActions = actions.filter(
    (action) => action.priority === "medium"
  );
  const lowPriorityActions = actions.filter(
    (action) => action.priority === "low"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Blockchain Actions
              </h2>
              <p className="text-sm text-gray-600">
                Manage your products and interact with the VeriCrop blockchain
              </p>
            </div>

            {/* Pending Transactions Indicator */}
            {pendingTransactions > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg border border-yellow-200">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">
                    {pendingTransactions} Pending
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* High Priority Actions */}
          {highPriorityActions.length > 0 && (
            <div className="space-y-3 mb-6">
              {highPriorityActions.map((action, index) => (
                <motion.div
                  key={action.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Button
                    onClick={action.onClick}
                    disabled={action.disabled || loadingStates[action.key]}
                    className={`w-full justify-start h-auto p-4 ${action.className}`}
                    variant={action.variant}
                  >
                    {loadingStates[action.key] ? (
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    ) : (
                      <action.icon className="h-5 w-5 mr-3" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm opacity-80 mt-1">
                        {action.description}
                      </div>
                    </div>
                    {action.key === "register" && (
                      <Badge className="ml-auto bg-white text-green-700 border-0">
                        Required
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Registration Status */}
          {isRegistered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 mb-6"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Farmer registration complete - All features unlocked
              </span>
            </motion.div>
          )}

          {/* Medium & Low Priority Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...mediumPriorityActions, ...lowPriorityActions].map(
              (action, index) => (
                <motion.div
                  key={action.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: highPriorityActions.length * 0.1 + index * 0.05,
                  }}
                >
                  <Button
                    onClick={action.onClick}
                    disabled={action.disabled || loadingStates[action.key]}
                    className={`w-full h-auto p-4 flex-col items-start ${action.className}`}
                    variant={action.variant}
                  >
                    <div className="flex items-center gap-2 w-full mb-2">
                      {loadingStates[action.key] ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <action.icon className="h-4 w-4" />
                      )}
                      <span className="font-medium text-sm">
                        {action.label}
                      </span>
                    </div>
                    <p className="text-xs opacity-80 text-left">
                      {action.description}
                    </p>
                  </Button>
                </motion.div>
              )
            )}
          </div>

          {/* Disabled State Message */}
          {!isRegistered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="text-sm text-gray-600 text-center">
                <Shield className="h-4 w-4 inline mr-2" />
                Complete farmer registration to unlock all blockchain features
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
