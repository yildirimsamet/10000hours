import Cookies from "js-cookie";

export const getConfigForClient = () => {
  interface IConfig {
    headers: {
      "Content-Type": string;
      Authorization?: string;
    };
  }
  const config: IConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return {};
};
