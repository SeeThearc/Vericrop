import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, QrCode, Package, FileText, Cpu, Shield, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentVerifications = [
  {
    id: "VC-001",
    product: "Organic Wheat",
    authenticity: "Authentic",
    farmer: "Green Acres Farm",
    inspector: "AgriCert Inc.",
    date: "2024-07-20",
  },
  {
    id: "VC-002",
    product: "Premium Corn",
    authenticity: "Authentic",
    farmer: "Sun Harvest Co.",
    inspector: "BioInspect LLC",
    date: "2024-07-19",
  },
  {
    id: "VC-003",
    product: "Fresh Tomatoes",
    authenticity: "Flagged",
    farmer: "Fieldstone Organics",
    inspector: "AgriCert Inc.",
    date: "2024-07-18",
  },
  {
    id: "VC-004",
    product: "Soybean Batch A",
    authenticity: "Authentic",
    farmer: "Rural Roots",
    inspector: "BioInspect LLC",
    date: "2024-07-17",
  },
  {
    id: "VC-005",
    product: "Durum Wheat",
    authenticity: "Authentic",
    farmer: "Grainbelt Farms",
    inspector: "AgriCert Inc.",
    date: "2024-07-17",
  },
];


const DistributerPage = () => {
	return (
		<div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Welcome & QR Scanner */}
        <Card className="lg:col-span-1 bg-green-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start">
              <ShieldCheck className="h-8 w-8 text-green-700 mr-4 mt-1" />
              <div>
                <h1 className="text-xl font-bold">Welcome, VeriCrop Distributor!</h1>
                <p className="text-sm text-gray-600">Monitor supply chain activities, verify products, and detect fraud.</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-bold mb-2">QR SCANNER</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <QrCode className="mr-2 h-4 w-4" /> Scan QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Products Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,245 MT</div>
              <p className="text-xs text-green-500">+12% this month</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-gray-500">Requires attention</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Product Authenticity */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-md font-semibold">Product Authenticity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">All recent products checked have passed authenticity tests.</p>
            <div className="inline-block bg-yellow-400 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              Verified
            </div>
            <Button variant="outline" className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>

        {/* Supplier Certifications */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-md font-semibold">Supplier Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">2 supplier certifications awaiting approval for renewal.</p>
            <div className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              Pending
            </div>
            <Button variant="outline" className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>

        {/* ML Fraud Detection */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-md font-semibold">ML Fraud Detection</CardTitle>
            <Shield className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
             <div className="inline-block bg-yellow-400 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mb-2">
              All Clear
            </div>
            <p className="text-sm text-gray-600">No suspicious activities or anomalies detected in the last 24 hours.</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Verifications Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Authenticity</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentVerifications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.authenticity === 'Authentic' ? 'bg-yellow-400 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {item.authenticity}
                    </span>
                  </TableCell>
                  <TableCell>{item.farmer}</TableCell>
                  <TableCell>{item.inspector}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
	);
};

export default DistributerPage;
