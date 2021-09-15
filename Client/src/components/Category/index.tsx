import styles from "./styles.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import StatuBar from "../StatuBar";
import classnames from "classnames";
import { myAxios as axios } from "../../utils/axios";
import { getConfigForClient } from "../../utils/getConfigForClient";
import notify from "../../utils/notify";
import { getUserInfo } from "../../utils/getUserInfo";
import { useUser } from "../../contexts/UserContext";
import Swal from "sweetalert2";
interface ICategory {
  name: string;
  hours: number;
}
const Category: React.FC<ICategory> = ({ name, hours }) => {
  const { setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = {
    add: "Add",
    remove: "Remove",
  };

  const [currentSection, setCurrentSection] = useState("Add");
  const [updateHoursInput, setUpdateHoursInput] = useState("");

  const recallUser = () => {
    getUserInfo().then((res) => {
      setUser({ email: res.data.email, categories: res.data.categories });
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(updateHoursInput)) {
      try {
        const { data } = await axios.post(
          "/user/update-category",
          {
            name,
            action: currentSection === "Add" ? "increment" : "decrement",
            hours: +updateHoursInput,
          },
          getConfigForClient()
        );
        if (data.success) {
          setUpdateHoursInput("");
          recallUser();
          setMenuOpen(false);
        }
        notify({
          success: data.success,
          message: data.message || "Güncelleme başarılı",
        });
      } catch (error) {
        notify({ success: false, message: "Something went wrong" });
      }
    } else {
      notify({ success: false, message: "Please provide number" });
    }
  };
  const emojiCalculator = (hour: number) => {
    if (hour >= 0 && hour < 2000) return "😀";
    if (hour >= 2000 && hour < 4000) return "😄";
    if (hour >= 4000 && hour < 6000) return "😂";
    if (hour >= 6000 && hour < 8000) return "😎";
    if (hour >= 8000 && hour <= 10000) return "😍";
  };
  return (
    <div className={styles.categoryOuter}>
      <div className={styles.category}>
        <div className={styles.categoryHeader}>
          <p>
            {name}
            {hours <= 500 && `(${hours} hours) `}
          </p>
          <p>{emojiCalculator(hours)}</p>
          {menuOpen ? (
            <AiOutlineClose
              onClick={() => {
                setUpdateHoursInput("");
                setMenuOpen(false);
              }}
              size="24"
            />
          ) : (
            <BiMenuAltRight
              size="24"
              onClick={() => {
                setUpdateHoursInput("");
                setMenuOpen(true);
              }}
            />
          )}
        </div>
        <div>
          <StatuBar hours={hours} />
        </div>
      </div>
      <div
        className={classnames(
          styles.categoryMenu,
          menuOpen && styles.categoryMenuActive
        )}
      >
        <span
          onClick={async () => {
            Swal.fire({
              title: "Are you sure?",
              icon: "question",
              // cancelButtonText:"Cancel",
              showCancelButton: true,
            }).then(async (res) => {
              const { isConfirmed } = res;
              if (isConfirmed) {
                try {
                  const { data } = await axios.post(
                    "/user/update-category",
                    {
                      action: "remove",
                      name,
                    },
                    getConfigForClient()
                  );
                  notify({
                    success: data.success,
                    message: data.message || "Category successfully removed.",
                  });
                  recallUser()
                } catch (error) {
                  notify({ success: false, message: "An error occured." });
                }
              }
            });
          }}
          className={styles.categoryMenuRemove}
        >
          Remove Category
        </span>
        <div className={styles.categoryMenuHeader}>
          {Object.values(sections).map((section) => {
            return (
              <button
                onClick={() => setCurrentSection(section)}
                className={classnames(
                  styles.categoryMenuHeaderButton,
                  currentSection === section &&
                    styles.categoryMenuHeaderButtonActive
                )}
              >
                {section}
              </button>
            );
          })}
        </div>
        <div className={styles.categoryMenuForm}>
          <form onSubmit={handleSubmit}>
            <input
              value={updateHoursInput}
              onChange={(e) => setUpdateHoursInput(e.target.value)}
              className={styles.categoryMenuFormInput}
              placeholder={`How many hours will you ${currentSection}?`}
              type="text"
            />
            <input
              className={styles.categoryMenuFormButton}
              value={currentSection}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Category;
