import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const FilterProducts = () => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Filter Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-3">Location</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="california" className="border-black" />
                            <Label htmlFor="california" className="text-base">California, USA</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="amazon" className="border-black" />
                            <Label htmlFor="amazon" className="text-base">Amazon, Brazil</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="punjab" className="border-black" />
                            <Label htmlFor="punjab" className="text-base">Punjab, India</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="loire" className="border-black" />
                            <Label htmlFor="loire" className="text-base">Loire Valley, France</Label>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">Price Range</h3>
                    <div className="flex items-center space-x-2">
                        <Input placeholder="Min" type="number" className="w-1/2" />
                        <span className="text-gray-500">-</span>
                        <Input placeholder="Max" type="number" className="w-1/2" />
                    </div>
                    <Button className="w-full mt-3 bg-gray-200 text-gray-700 hover:bg-gray-300">Apply Price Filter</Button>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-3">Certifications</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="organic" className="border-black" />
                            <Label htmlFor="organic" className="text-base">Organic Certified</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="fair-trade" className="border-black" />
                            <Label htmlFor="fair-trade" className="text-base">Fair Trade</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="rainforest-alliance" className="border-black" />
                            <Label htmlFor="rainforest-alliance" className="text-base">Rainforest Alliance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="non-gmo" className="border-black" />
                            <Label htmlFor="non-gmo" className="text-base">Non-GMO</Label>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
