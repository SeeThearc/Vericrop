import CompliancePage from "./compliance/page";
import FlaggedShipmentsPage from "./flagged-shipments/page";
import QualityVerificationPage from "./quality-verification/page";
import { Card, CardContent } from "@/components/ui/card";

const InspectorPage = () => {
  return (
    <>
      <Card className="border-2 border-blue-200">
        <CardContent>
          <FlaggedShipmentsPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200">
        <CardContent>
          <QualityVerificationPage />
        </CardContent>
      </Card>
      <Card className="border-2 border-green-200">
        <CardContent>
          <CompliancePage />
        </CardContent>
      </Card>
    </>
  );
};

export default InspectorPage;
