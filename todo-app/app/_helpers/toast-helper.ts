import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const showPromiseToast = (promise: Promise<any>, messages: { pending: string, success: string, error: string }) => {
  toast.promise(
    promise,
    {
      pending: messages.pending,
      success: messages.success,
      error: messages.error
    },
    {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    }
  );
};
