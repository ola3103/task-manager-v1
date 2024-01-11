import { toast } from "react-toastify";

export const notify = (message, status) => {
  if (status === "success") return toast.success(message);
  if (status === "error") return toast.error(message);
};
