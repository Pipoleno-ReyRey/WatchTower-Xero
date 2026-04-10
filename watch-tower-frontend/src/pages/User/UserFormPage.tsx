// este codigo fue hecho por ia
import { useParams } from "react-router-dom";
import { UserForm } from "../../components/user/UserForm";
import { useUser } from "../../hooks/useUser";
import type { IUserResponse } from "../../schemas/user";

const mapUserToForm = (user: IUserResponse) => ({
  id: user.id,
  name: user.name,
  userName: user.userName,
  email: user.email,
  pin: user.pin,
  roles: user.role ? [user.role] : [],
});

export const UserFormPage = () => {
  const { id } = useParams();
  const { useUserByIdQuery } = useUser();

  const userId = id ? Number(id) : undefined;

  const { data, isError } = useUserByIdQuery(userId!);

  if (userId && isError) {
    return <p>Error cargando el usuario</p>;
  }

  const mappedUser = data ? mapUserToForm(data) : null;

  return <UserForm user={mappedUser} />;
};
