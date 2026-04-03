import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface Props {
  icon: LucideIcon;
  label: string;
  data: string | number;
  subtitle?: string;
}

export const Stat = ({ label, data, subtitle, icon: Icon }: Props) => {
  return (
    <Card className="py-4">
      <CardContent className="flex flex-col gap-2 justify-center">
        <div className="flex items-center gap-5">
          <div className="bg-secondary p-2 rounded-md">
            <Icon size={35} />
          </div>

          <div className="flex flex-col">
            <h6 className="text-sm capitalize">{label}</h6>
            <span className="text-xl font-bold">{data}</span>
            {subtitle && (
              <div>
                <span className="text-xs text-muted-foreground">
                  {subtitle}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
