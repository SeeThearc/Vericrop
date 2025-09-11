import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const FilterBatches = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Filter Batches</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Crop</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="wheat" className="border-black" />
              <Label htmlFor="wheat" className="text-base">Wheat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rice" className="border-black" />
              <Label htmlFor="rice" className="text-base">Rice</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="corn" className="border-black" />
              <Label htmlFor="corn" className="text-base">Corn</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="soybean" className="border-black" />
              <Label htmlFor="soybean" className="text-base">Soybean</Label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Location</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="punjab" className="border-black" />
              <Label htmlFor="punjab" className="text-base">Punjab, India</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="haryana" className="border-black" />
              <Label htmlFor="haryana" className="text-base">Haryana, India</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="california" className="border-black" />
              <Label htmlFor="california" className="text-base">California, USA</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brazil" className="border-black" />
              <Label htmlFor="brazil" className="text-base">Amazon, Brazil</Label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Quality</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="high" className="border-black" />
              <Label htmlFor="high" className="text-base">High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" className="border-black" />
              <Label htmlFor="medium" className="text-base">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="low" className="border-black" />
              <Label htmlFor="low" className="text-base">Low</Label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Quantity Range</h3>
          <div className="flex items-center space-x-2">
            <Input placeholder="Min" type="number" className="w-1/2" />
            <span className="text-gray-500">-</span>
            <Input placeholder="Max" type="number" className="w-1/2" />
          </div>
          <Button className="w-full mt-3 bg-gray-200 text-gray-700 hover:bg-gray-300">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};
