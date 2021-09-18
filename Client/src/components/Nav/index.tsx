import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";
import logout from "../../utils/logout";
const Nav = () => {
  const { user, setUser } = useUser();
  const handleLogout = () => {
    logout();
    setUser(null);
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>10000Hours</div>
      {user ? (
        <div className={styles.navUser}>
          <p>Welcome, {user.email.split("@")[0]}</p>
          <span onClick={handleLogout} className={styles.navClose}>X</span>
        </div>
      ) : null}
    </nav>
  );
};
export default Nav;
