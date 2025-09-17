import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export const toastOptions = {
  position: 'top-right',
  timeout: 10000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  // Customize the toast styles to match your theme
  toastDefaults: {
    // Toast customizations per type
    success: {
      containerClassName: 'bg-purple-600',
      toastClassName: 'bg-purple-600',
    },
    error: {
      containerClassName: 'bg-red-600',
      toastClassName: 'bg-red-600',
    },
    warning: {
      containerClassName: 'bg-yellow-500',
      toastClassName: 'bg-yellow-500',
    },
    info: {
      containerClassName: 'bg-blue-600',
      toastClassName: 'bg-blue-600',
    },
  },
};

export default Toast;
