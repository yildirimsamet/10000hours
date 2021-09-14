import { myAxios as axios } from "./axios";
import { getConfigForClient } from "./getConfigForClient";
export const getUserInfo = async() => {
    const { data } = await axios.post("/get-user", {}, getConfigForClient()).then((res: any) => {
       return res
      });
      return data;
    };