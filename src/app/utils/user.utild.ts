import { getUser } from "../(Backend)/actions/userActions";
import { IUser } from "../(Backend)/db/model/User.schema";

export async function updateUser() {
  const user = await getUser();

  if (!user.success) {
    return null;
  }

  return user.data as IUser;
}
