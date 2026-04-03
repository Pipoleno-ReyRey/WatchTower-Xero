import { Filter, SearchIcon } from "lucide-react";
import { AuditTable } from "../components/audit/AuditTable";
import { CustomSelect } from "../components/form/CustomSelect";
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
  const { filteredData, search, setSearch, setFilter } = useSearch(
    auditQuery.data,
  );
  const options = [
    { label: "Todos", value: "userName" },
    { label: "Exitoso", value: "action" },
    { label: "Fallo", value: "ip" },
  ];
  return (
    <div className=" w-full space-y-3">
      <div className=" space-y-3">
        <div className="py-4 flex justify-between items-center">
          <h2 className="font-bold text-2xl">Auditoria</h2>
        </div>
      </div>

      <Card>
        <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          <div className="lg:col-span-3">
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
          </div>

          <div className="flex gap-2 items-center lg:col-span-1">
            <Filter size={15} className="hidden lg:block" />

            <CustomSelect
              placeholder="Roles"
              options={(options ?? []).map((r) => ({
                label: r.label,
                value: r.value,
              }))}
              onValueChange={(value) => setFilter("role", value)}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <AuditTable data={filteredData || []} />
        </CardContent>
      </Card>
    </div>
  );
};
