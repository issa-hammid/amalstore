import { toast } from 'react-toastify';

export const notify = {
  // ✅ نجاح
  success: (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 3000,
    });
  },

  // ❌ خطأ
  error: (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 4000,
    });
  },

  // ⚠️ تحذير
  warning: (message) => {
    toast.warning(message, {
      position: "top-left",
      autoClose: 3500,
    });
  },

  // ℹ️ معلومات
  info: (message) => {
    toast.info(message, {
      position: "top-left",
      autoClose: 3000,
    });
  }
};