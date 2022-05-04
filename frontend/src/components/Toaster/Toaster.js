import { toast } from "react-toastify";

const style = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const toastSuccess = (msg = "Success") =>
  toast.success(msg, { ...style });

export const toastError = (msg = "Success") => toast.error(msg, { ...style });
export const toastInfo = (msg = "Success") => toast.info(msg, { ...style });
export const toastWarn = (msg = "Success") => toast.warn(msg, { ...style });
