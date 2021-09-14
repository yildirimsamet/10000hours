import { toast } from "react-toastify";
import React from 'react'
interface INotify {
  success?: boolean;
  message?: string;
}
const notify: React.FC<INotify> = ({ success=true, message="Başarılı" }):any => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
export default notify;
