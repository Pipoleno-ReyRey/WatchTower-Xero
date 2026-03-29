// import { useParams } from "react-router-dom";
import { UserForm } from "../../components/user/UserForm";
// import { useUser } from "../../hooks/useUser";

export const UserFormPage = () => {
  // const { id } = useParams();
  // const { getUserByIdQuery } = useUser();

  // const { data, isLoading } = getUserByIdQuery(id!, {
  //   enabled: !!id, // 🔥 solo si hay id
  // });

  // if (id && isLoading) return <p>Cargando usuario...</p>;

  return <UserForm user={undefined} />;
};
