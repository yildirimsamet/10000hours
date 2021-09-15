import { myAxios as axios } from "./axios";
import { getConfigForClient } from "./getConfigForClient";
export const getUserInfo = async() => {
    const { data } = await axios.post("/user/get-user", {}, getConfigForClient()).then((res: any) => {
      console.log(res)
       return res
      });
      return data;
    };