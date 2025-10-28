import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";
import App from "./App.vue";
import router from "./router";
import "./css/style.css";
import axios from "axios";
import { useAlert } from "./composables/useAlert";
const app = createApp(App);
let BASE_URL = "http://localhost:5000/api/v1/admin-app";
axios.defaults.baseURL = BASE_URL;
// Pinia ni sozlash
const pinia = createPinia();
app.use(pinia);
app.config.globalProperties.$alert = useAlert;
// Vue Router ni sozlash
app.use(router);
app.provide("BASE_URL", BASE_URL);

// Global xatolik boshqaruvi
app.config.errorHandler = (err, instance, info) => {
  console.error("Vue xatosi:", err);
  console.log("Vue instansi:", instance);
  console.log("Xato ma'lumoti:", info);
};

// Global property qo'shish
app.config.globalProperties.$filters = {
  formatCurrency(value) {
    if (!value) return "$0";
    return `$${parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },
  formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
  truncateText(text, length = 50) {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  },
};
// Ilovani ishga tushirish
app.mount("#app");

// Development rejimida global o'zgaruvchilar
// if (import.meta.env.DEV) {
//   window.__VUE_APP__ = app
// }
