import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import Category from "../Category";
import { useState } from "react";
import { myAxios as axios } from "../../utils/axios";
import { getUserInfo } from "../../utils/getUserInfo";
import notify from "../../utils/notify";
import { getConfigForClient } from "../../utils/getConfigForClient";

const CategoryList = () => {
  const { user ,setUser} = useUser();
  const { categories } = user;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    categoryName: "",
    initialHours: "",
  });
  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInfo({ ...modalInfo, [e.target.name]: e.target.value });
  };
  const recallUser = () => {
    getUserInfo().then((res) => {
      setUser({ email: res.data.email, categories: res.data.categories });
    });
  };
  return (
    <div className={styles.categoryList}>
      <div className={styles.categoryListHeader}>
        <p>Categories</p>
        <AiFillPlusCircle onClick={()=>setModalOpen(true)} size="24" color="green" />
      </div>
      <div className={styles.categoryListCategories}>
        {categories &&
          categories.map(
            (category: { name: string; hours: number }, index: number) => {
              return <Category key={index} {...category} />;
            }
          )}
      </div>
      {modalOpen && (
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>New Category</h3>
          <span
            onClick={() => setModalOpen(false)}
            className={styles.modalClose}
          >
            X
          </span>
          <label htmlFor="categoryName">Category Name</label>
          <input
            value={modalInfo.categoryName}
            name="categoryName"
            onChange={handleModalChange}
            id="categoryName"
            placeholder="Category Name"
            type="text"
          />
          <label htmlFor="initialHours">Initial Hours</label>
          <input
            value={modalInfo.initialHours}
            name="initialHours"
            onChange={handleModalChange}
            id="initialHours"
            placeholder="Initial Hours"
            type="text"
          />
          <button onClick={async() => {
            if(modalInfo.categoryName){
              try {
                const {data}=await axios.post("/user/create-category",{name:modalInfo.categoryName,initialHours: +modalInfo.initialHours || 0},getConfigForClient())
                if(data.success){
                  recallUser();
                  setModalOpen(false)
                }
                notify({success:data.success,message:data.message||"Category added successfully."})
              } catch (error) {
                notify({success:false,message:"Something went wrong"}) 
              }
            }
          }}>Submit</button>
        </div>
      )}
    </div>
  );
};
export default CategoryList;
