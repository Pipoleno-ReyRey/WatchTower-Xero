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
import { mockDocuments } from "../../data/data";

export const DocumentPage = () => {
  const roleOptions = [
    { label: "Administrador", value: "1" },
    { label: "Usuario", value: "2" },
  ];

  const statusOptions = [
    { label: "Activo", value: "1" },
    { label: "Inactivo", value: "2" },
    { label: "Bloqueado", value: "3" },
  ];
  return (
    <div className="w-full space-y-3">
      <div className="py-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Documentos</h2>

        {/* <DocumentModal />
         */}
        <Link to={"./create"}>
          <Button className="cursor-pointer">
            <Plus />
            Nuevo Documento
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <InputGroup>
              <InputGroupInput placeholder="Buscar nombre o propietario..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex gap-2 items-center lg:col-span-1">
            <Filter size={30} className="hidden lg:block" />

            <CustomSelect
              placeholder="Roles"
              options={roleOptions}
              className="lg:w-44"
            />

            <CustomSelect placeholder="Estado" options={statusOptions} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <DocumentTable documents={mockDocuments} />
        </CardContent>
      </Card>
    </div>
  );
};
