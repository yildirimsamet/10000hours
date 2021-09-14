import { useState } from "react";
import { myAxios as axios } from "../../../utils/axios";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { FcLock, FcUnlock } from "react-icons/fc";
import notify from "../../../utils/notify";
const Auth = () => {
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
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const END_POINT =
      section === sections[0].id ? "/user/signin" : "/user/signup";
    try {
      const { data } = await axios.post(END_POINT, userInfo);
     if(data){
       notify({success:data.success,message:data.message})
     }
    } catch (error) {
      notify({ success: false, message: "Bilinmeyen bir hata oluştu." });
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
            onChange={handleChange}
          />
          <label htmlFor="authPassword">Password</label>
          <input
            id="authPassword"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <input
            value="Submit"
            type="submit"
            className={styles.authFormSubmit}
          />
        </form>
      </div>
    </div>
  );
};
export default Auth;
