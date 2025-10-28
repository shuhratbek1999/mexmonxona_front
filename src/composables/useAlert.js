import { ref } from "vue";

export function useAlert() {
  const alertState = ref({
    show: false,
    type: "success",
    title: "",
    message: "",
    duration: 5000,
  });

  const showAlert = (options) => {
    alertState.value = {
      show: true,
      type: options.type || "success",
      title: options.title || "",
      message: options.message || "",
      duration: options.duration || 5000,
    };
  };

  const showSuccess = (title, message = "", duration = 5000) => {
    showAlert({ type: "success", title, message, duration });
  };

  const showError = (title, message = "", duration = 5000) => {
    showAlert({ type: "error", title, message, duration });
  };

  const showWarning = (title, message = "", duration = 5000) => {
    showAlert({ type: "warning", title, message, duration });
  };

  const showInfo = (title, message = "", duration = 5000) => {
    showAlert({ type: "info", title, message, duration });
  };

  const hideAlert = () => {
    alertState.value.show = false;
  };

  return {
    alertState,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideAlert,
  };
}
