import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Settings, User2 } from "lucide-react";
import { Badge } from "../ui/badge";
import type { Role } from "../../schemas/role";

interface Props {
  role: Role;
}

export const RoleCard = ({ role }: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-foreground capitalize">
              {role.role}
            </h3>
            <span className="mt-0.5 text-xs text-muted-foreground">
              {role.description}
            </span>
          </div>
          <Button variant={"ghost"} size={"icon-sm"}>
            <Settings />
          </Button>
        </div>
        {/* <div className="flex items-center gap-1 ">
          <User2 size={16} /> <span className="text-xs"> 1 usuario</span>
        </div> */}

        {/* <div className="flex gap-2 flex-wrap">
          <Badge variant={"secondary"}>Sweet pain</Badge>
          <Badge>Lenny y jhan</Badge>
          <Badge variant={"destructive"}>React</Badge>
          <Badge variant={"outline"}>Sweet</Badge>
          <Badge>Sweet</Badge>
          <Badge>Sweet</Badge>
          <Badge>Sweet</Badge>
          <Badge>Sweet</Badge>
        </div> */}
      </CardContent>
    </Card>
  );
};
