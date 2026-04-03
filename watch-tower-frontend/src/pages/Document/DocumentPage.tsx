import { Filter, Plus, SearchIcon } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";

import { CustomSelect } from "../../components/form/CustomSelect";
import { DocumentTable } from "../../components/document/DocumentTable";

import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

import { useDocument } from "../../hooks/useDocument";
import { getCurrentUser } from "../../lib/axios";
import { useSearch } from "../../hooks/useSearch";

export const DocumentPage = () => {
  const { documentQuery } = useDocument();
  const user = getCurrentUser();

  const { search, setSearch, setFilter, filteredData } = useSearch(
    documentQuery.data,
  );

  const documentFilter = [
    { label: "Todos", value: "1" },
    { label: "Mis documentos", value: user?.userName || "2" },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Documentos</h2>

        <Link to={"./create"}>
          <Button className="cursor-pointer">
            <Plus />
            Nuevo Documento
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {/* 🔎 SEARCH */}
          <div className="lg:col-span-3">
            <InputGroup>
              <InputGroupInput
                placeholder="Buscar nombre o propietario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* 🎯 FILTER */}
          <div className="flex gap-2 items-center lg:col-span-1">
            <Filter size={30} className="hidden lg:block" />

            <CustomSelect
              placeholder="Documentos"
              options={documentFilter}
              onValueChange={(value) => {
                if (value === "1") {
                  setFilter("owner", undefined);
                } else {
                  setFilter("owner", user?.userName);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <DocumentTable documents={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};
