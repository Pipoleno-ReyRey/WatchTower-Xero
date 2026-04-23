import { SearchIcon } from "lucide-react";
import { AuditTable } from "../components/audit/AuditTable";

import { Card, CardContent } from "../components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { useAudit } from "../hooks/useAudit";
import { useSearch } from "../hooks/useSearch";

export const AuditPage = () => {
  const { auditQuery } = useAudit();

  const { filteredData, search, setSearch } = useSearch(
    auditQuery.data || []
  );

  return (
    <div className="w-full space-y-3 overflow-x-hidden">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Auditoria</h2>
      </div>

      <Card>
        <CardContent>
          <InputGroup>
            <InputGroupInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuarios por nombre o email..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <AuditTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};