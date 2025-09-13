"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import {
  ClipboardCheck,
  FileText,
  QrCode,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

const qualityChartData = [
  { month: "Jan", good: 186, bad: 80 },
  { month: "Feb", good: 305, bad: 200 },
  { month: "Mar", good: 237, bad: 120 },
  { month: "Apr", good: 73, bad: 190 },
  { month: "May", good: 209, bad: 130 },
  { month: "Jun", good: 214, bad: 140 },
];

const qualityChartConfig = {
  good: {
    label: "Good",
    color: "rgba(74, 222, 128, 1)",
  },
  bad: {
    label: "Bad",
    color: "rgba(239, 68, 68, 1)",
  },
} satisfies ChartConfig;

const pendingVerifications = [
  {
    id: "VC-P-001",
    product: "Organic Wheat",
    source: "Farmer",
    sender: "John Doe",
    date: "2024-07-21",
  },
  {
    id: "VC-P-002",
    product: "Premium Corn",
    source: "Distributer",
    sender: "Sun Harvest Co.",
    date: "2024-07-20",
  },
  {
    id: "VC-P-003",
    product: "Fresh Tomatoes",
    source: "Retailer",
    sender: "Local Mart",
    date: "2024-07-19",
  },
];

const QualityVerificationPage = () => {
  const [result, setResult] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleClassify = () => {
    if (file) {
      // Mock classification
      const randomResult = Math.random() > 0.5 ? "Good" : "Bad";
      setResult(randomResult);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Fruit/Vegetable Classifier */}
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold">Classify Produce</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload image to determine quality.
                </p>
                <div className="mt-4 w-full">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm w-full block text-center"
                  >
                    Choose File
                  </label>
                  {file && <p className="mt-2 text-xs text-center">{file.name}</p>}
                  <Button onClick={handleClassify} className="w-full mt-2 bg-green-600 hover:bg-green-700" size="sm">
                    Classify
                  </Button>
                  {result && (
                    <div
                      className={`mt-2 p-2 rounded-md text-xs ${result === "Good"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      Result: {result}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Scan QR Code */}
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <QrCode className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Quickly scan products for verification.
                </p>
              </CardContent>
            </Card>

            {/* Perform Quality Check */}
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <ClipboardCheck className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold">
                  Perform Quality Check
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Initiate a new quality verification report.
                </p>
              </CardContent>
            </Card>

            {/* Generate Report */}
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <FileText className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold">Generate Report</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Create detailed inspection reports.
                </p>
              </CardContent>
            </Card>

            {/* Resolve Dispute */}
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold">Resolve Dispute</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Access and manage ongoing disputes.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingVerifications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>{item.sender}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Access Verified Batch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input placeholder="Enter Batch ID" />
                <Button>Fetch Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quality Detection & Final Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold">Batch ID: VC-B-12345</h3>
                <p className="text-sm text-muted-foreground">Product: Premium Corn</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quality-readings">Quality Readings</Label>
                  <Textarea
                    id="quality-readings"
                    placeholder="Enter observations, measurements, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="evidence-upload">Upload Evidence</Label>
                  <Input id="evidence-upload" type="file" />
                </div>
                <div>
                  <Label htmlFor="verification-status">
                    Final Verification Status
                  </Label>
                  <Select>
                    <SelectTrigger id="verification-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="further-inspection">
                        Further Inspection Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Submit Verification</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={qualityChartConfig} className="h-[300px] w-full">
            <AreaChart
              accessibilityLayer
              data={qualityChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="bad"
                type="natural"
                fill="var(--color-bad)"
                fillOpacity={0.4}
                stroke="var(--color-bad)"
                stackId="a"
              />
              <Area
                dataKey="good"
                type="natural"
                fill="var(--color-good)"
                fillOpacity={0.4}
                stroke="var(--color-good)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityVerificationPage;
