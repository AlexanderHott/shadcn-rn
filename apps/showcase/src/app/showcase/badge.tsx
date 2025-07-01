import { Badge, BadgeText } from "@/components/ui/badge";
import { Row, ScreenContainer } from "@/components/ui/container";
import { Verified } from "@/components/ui/icons";

const VARIANTS = ["default", "secondary", "destructive", "outline"] as const;

export default function BadgeShowcaseScreen() {
  return (
    <ScreenContainer edges={["bottom"]} className="gap-8">
      <Row className="flex-wrap justify-center gap-4">
        {VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant}>
            <BadgeText>Badge - {variant}</BadgeText>
          </Badge>
        ))}
      </Row>
      <Row className="flex-wrap justify-center gap-4">
        <Badge className="bg-blue-500  dark:bg-blue-600" variant="secondary">
          <Verified size={16} className="text-white" />
          <BadgeText className="text-white">verified</BadgeText>
        </Badge>
        <Badge className="px-1" variant="outline">
          <BadgeText className="font-mono h-5 min-w-5 rounded-full tabular-nums">
            20+
          </BadgeText>
        </Badge>
      </Row>
    </ScreenContainer>
  );
}
