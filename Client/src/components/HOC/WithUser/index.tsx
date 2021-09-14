import { useState, useEffect } from "react";
import { UserProvider } from "../../../contexts/UserContext";
import Cookies from "js-cookie";
import { getUserInfo } from "../../../utils/getUserInfo";
interface IWithUser {
  children: React.ReactNode | any;
}
interface IUserState {
  success: boolean;
  data: IUserData;
}
interface IUserData {
  email: string;
  categories?: CategoriesEntity[] | null;
  token: string;
}
interface CategoriesEntity {
  name: string;
  hours: number;
}
interface IUser {
  email:string;
  categories:any[]
}

const WithUser: React.FC<IWithUser> = ({ children }) => {
  const [user, setUser] = useState<IUserState | null>(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      getUserInfo();
    }
  }, []);

  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};
export default WithUser;
