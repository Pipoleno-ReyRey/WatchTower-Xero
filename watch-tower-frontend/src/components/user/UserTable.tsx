import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const items = [
  {
    id: "1",
    name: "Philip George",
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
    fallback: "PG",
    email: "philipgeorge20@gmail.com",
    location: "Mumbai, India",
    status: "Active",
    balance: "$10,696.00",
  },
  {
    id: "2",
    name: "Tiana Curtis",
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png",
    fallback: "TC",
    email: "tiana12@yahoo.com",
    location: "New York, US",
    status: "applied",
    balance: "$0.00",
  },
  {
    id: "3",
    name: "Jaylon Donin",
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
    fallback: "JD",
    email: "jaylon23d.@outlook.com",
    location: "Washington, US",
    status: "Active",
    balance: "$569.00",
  },
  {
    id: "4",
    name: "Kim Yim",
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png",
    fallback: "KY",
    email: "kim96@gmail.com",
    location: "Busan, South Korea",
    status: "Inactive",
    balance: "-$506.90",
  },
];

export const UserTable = () => {
  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead className="text-right">Balance</TableHead> */}
              <TableHead className="">Accion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={item.src} alt={item.fallback} />
                      <AvatarFallback className="text-xs">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{item.name}</div>
                  </div>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.status}</TableCell>
                {/* <TableCell className="text-right">{item.balance}</TableCell> */}
                <TableCell className="">...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
