import { Link } from "react-router-dom";
import type { IDocument } from "../../schemas/document";

import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Props {
  documents: IDocument[];
}

export const DocumentTable = ({ documents }: Props) => {
  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Titulo</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead>Actualizado</TableHead>

              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((d) => (
              <TableRow key={d.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{d.title}</div>
                  </div>
                </TableCell>
                <TableCell>{d.owner}</TableCell>
                <TableCell>
                  {new Date(d.createdAt).toLocaleDateString("es-DO")}
                </TableCell>

                <TableCell>
                  {new Date(d.updatedAt).toLocaleDateString("es-DO")}
                </TableCell>

                <TableCell className="">
                  <Link to={`${d.id}`}>
                    <Button size={"sm"}>Ver</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
