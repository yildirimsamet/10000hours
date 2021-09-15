import Cookies from 'js-cookie'
const logout=()=>{
    try {
        localStorage.removeItem("user");
        Cookies.remove("token");
    } catch (error) {
        console.log("logout error",error)
    }
};
export default logout;