import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

import type { Role } from "../../schemas/role";
import { useStore } from "../../store/appStore";

interface Props {
  role: Role;
}

export const RoleCard = ({ role }: Props) => {
  const setRole = useStore((state) => state.setRole);
  const setOpenModalRole = useStore((state) => state.setOpenModalRole);
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
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => {
              setRole(role);
              setOpenModalRole(true);
            }}
          >
            <Settings />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
