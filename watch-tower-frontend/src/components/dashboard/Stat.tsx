import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface Props {
  icon: LucideIcon;
  label: string;
  data: string | number;
}

export const Stat = ({ label, data, icon: Icon }: Props) => {
  return (
    <Card className="py-4">
      <CardContent className="flex gap-5 items-center">
        <div className="bg-secondary p-2 rounded-md">
          <Icon size={30} />
        </div>

        <div className="flex flex-col">
          <h6 className="text-xs capitalize">{label}</h6>
          <span className="text-xl font-bold">{data}</span>
        </div>
      </CardContent>
    </Card>
  );
};
