import { useState } from "react";
import { myAxios as axios } from "../../../utils/axios";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { FcLock, FcUnlock } from "react-icons/fc";
import notify from "../../../utils/notify";
import Cookies from "js-cookie";
import { useUser } from "../../../contexts/UserContext";
import Spinner from "../../Spinner";
const Auth = () => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const sections = [
    { id: 0, name: "Sign In", logo: <FcLock size="40" /> },
    { id: 1, name: "Sign Up", logo: <FcUnlock size="40" /> },
  ];
  const [section, setSection] = useState(sections[0].id);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const END_POINT =
      section === sections[0].id ? "/user/signin" : "/user/signup";
    try {
      setLoading(true);
      const { data } = await axios.post(END_POINT, userInfo);
      const user = data?.data;
      if (data) {
        notify({ success: data.success, message: data.message });
        if (section === sections[1].id) {
          setSection(sections[0].id);
          setUserInfo({ email: "", password: "" });
        }
      }
      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, categories: user.categories })
        );
        Cookies.set("token", user.token, { expires: 7 });
        setUser({ email: user.email, categories: user.categories });
      }
    } catch (error) {
      notify({ success: false, message: "Bilinmeyen bir hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.authHeader}>
        {sections[section].logo}
        <h3 className={styles.authHeaderTitle}>{sections[section].name}</h3>
      </div>
      <div className={styles.authFormWrapper}>
        {sections.map((sect: any) => {
          return (
            <button
              className={classnames(
                styles.authButton,
                section === sect.id && styles.authButtonActive
              )}
              key={sect.id}
              onClick={() => {
                setSection(sect.id);
              }}
            >
              {sect.name}
            </button>
          );
        })}
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="authEmail">Email</label>
          <input
            id="authEmail"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <label htmlFor="authPassword">Password</label>
          <input
            id="authPassword"
            name="password"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
          />

          <button type="submit" className={styles.authFormSubmit}>
            {loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
