type ToastStatus = {
  show: true;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
} | {
  show: false;
};

export default ToastStatus;