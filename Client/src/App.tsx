import "./styles/main.scss";
import { useUser } from "./contexts/UserContext";
import Auth from "./components/Pages/Auth";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const { user } = useUser();
  
  return <div className="App">
    {user ? "Var" : <Auth />}
    <ToastContainer />
  </div>;
};

export default App;
