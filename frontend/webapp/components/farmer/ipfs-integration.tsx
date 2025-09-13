"use client";
import { motion, AnimatePresence } from "motion/react";
import {
  Link,
  Copy,
  ExternalLink,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";

interface IPFSLinkProps {
  hash: string;
  label?: string;
  type?: "document" | "image" | "video" | "json" | "unknown";
  size?: number;
  description?: string;
  preview?: boolean;
  className?: string;
}

interface IPFSPreviewData {
  type: "text" | "image" | "json" | "unknown";
  content?: string;
  metadata?: Record<string, unknown>;
  error?: string;
}

export const IPFSLink = ({
  hash,
  label,
  type = "unknown",
  size,
  description,
  preview = true,
  className = "",
}: IPFSLinkProps) => {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<IPFSPreviewData | null>(null);
  const [loading, setLoading] = useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openIPFS = () => {
    window.open(`https://ipfs.io/ipfs/${hash}`, "_blank");
  };

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = `https://ipfs.io/ipfs/${hash}`;
    link.download = `ipfs-${hash.slice(0, 8)}`;
    link.click();
  };

  const fetchPreview = async () => {
    if (previewData || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const jsonData = await response.json();
        setPreviewData({
          type: "json",
          content: JSON.stringify(jsonData, null, 2).slice(0, 500),
          metadata: jsonData,
        });
      } else if (contentType.includes("text/")) {
        const textData = await response.text();
        setPreviewData({
          type: "text",
          content: textData.slice(0, 500),
        });
      } else if (contentType.includes("image/")) {
        setPreviewData({
          type: "image",
          content: `https://ipfs.io/ipfs/${hash}`,
        });
      } else {
        setPreviewData({
          type: "unknown",
          content: "Binary file - cannot preview",
        });
      }
    } catch {
      setPreviewData({
        type: "unknown",
        error: "Failed to load preview",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => {
    if (!showPreview && !previewData) {
      fetchPreview();
    }
    setShowPreview(!showPreview);
  };

  const getTypeIcon = () => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "json":
        return <FileText className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "document":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "image":
        return "text-green-600 bg-green-50 border-green-200";
      case "video":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "json":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <Card
      className={`border transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`p-2 rounded-lg border ${getTypeColor()}`}>
                {getTypeIcon()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {label && (
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {label}
                    </span>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {type.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-mono truncate">
                    {hash.slice(0, 16)}...{hash.slice(-8)}
                  </span>
                  {size && (
                    <>
                      <span>•</span>
                      <span>{formatSize(size)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyHash}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
              {copied && <span className="text-xs text-green-600">✓</span>}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openIPFS}
              className="text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={downloadFile}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>

            {preview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePreview}
                disabled={loading}
                className="text-xs"
              >
                {loading ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : showPreview ? (
                  <ChevronUp className="h-3 w-3 mr-1" />
                ) : (
                  <Eye className="h-3 w-3 mr-1" />
                )}
                {loading ? "Loading..." : showPreview ? "Hide" : "Preview"}
              </Button>
            )}
          </div>

          {/* Preview Section */}
          <AnimatePresence>
            {showPreview && previewData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t pt-3"
              >
                <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-auto">
                  {previewData.error ? (
                    <div className="text-red-600 text-sm">
                      {previewData.error}
                    </div>
                  ) : previewData.type === "image" && previewData.content ? (
                    <div className="flex justify-center">
                      <Image
                        src={previewData.content}
                        alt="IPFS Image"
                        width={200}
                        height={200}
                        className="max-w-full h-auto rounded border"
                      />
                    </div>
                  ) : previewData.type === "json" ? (
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                      {previewData.content}
                      {previewData.content &&
                        previewData.content.length >= 500 &&
                        "..."}
                    </pre>
                  ) : (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {previewData.content}
                      {previewData.content &&
                        previewData.content.length >= 500 &&
                        "..."}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

// Collection component for multiple IPFS links
interface IPFSLinksCollectionProps {
  title?: string;
  links: (IPFSLinkProps & { id: string })[];
  maxVisible?: number;
  className?: string;
}

export const IPFSLinksCollection = ({
  title = "IPFS Documents",
  links,
  maxVisible = 3,
  className = "",
}: IPFSLinksCollectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleLinks = showAll ? links : links.slice(0, maxVisible);
  const hasMore = links.length > maxVisible;

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Link className="h-5 w-5 text-purple-500" />
            {title}
          </h3>
          <Badge variant="secondary">
            {links.length} file{links.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      )}

      <div className="space-y-3">
        {visibleLinks.map((link) => (
          <IPFSLink
            key={link.id}
            hash={link.hash}
            label={link.label}
            type={link.type}
            size={link.size}
            description={link.description}
            preview={link.preview}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="text-sm"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show {links.length - maxVisible} More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
