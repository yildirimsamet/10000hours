import "./styles/main.scss";
import { useUser } from "./contexts/UserContext";
import Auth from "./components/Pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Pages/Home";
import MainLayout from "./components/Layouts/MainLayout";
import "sweetalert2/dist/sweetalert2.min.css"
const App = () => {
  const { user } = useUser();

  return (
    <MainLayout>
      <div className="App">
        {user ? <Home /> : <Auth />}
        <ToastContainer />
      </div>
    </MainLayout>
  );
};

export default App;
