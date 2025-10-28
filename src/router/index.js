// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");
import SuccessPage from "@/views/Foydalanuvchi/SuccessPage.vue";
import CancelPage from "@/views/Foydalanuvchi/CancelPage.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: true, guestOnly: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("@/views/Registration.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Foydalanuvchi/Home.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/user_booking",
    name: "UserBooking",
    component: () => import("@/views/Foydalanuvchi/UserBookings.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/success",
    name: "SuccesPage",
    component: SuccessPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/cancel",
    name: "CancelPage",
    component: CancelPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/booking/:id",
    name: "BookingDetails",
    component: () => import("@/views/Foydalanuvchi/BookingDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/Foydalanuvchi/About.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Foydalanuvchi/Contact.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/booking",
    name: "Booking",
    component: () => import("@/views/Foydalanuvchi/Booking.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: () => import("@/views/Foydalanuvchi/Rooms.vue"),
  },
  {
    path: "/rooms/:id",
    name: "RoomDetails",
    component: () => import("@/views/Foydalanuvchi/RoomDetails.vue"),
    props: true,
  },
  {
    path: "/admin",
    component: DashboardLayout,
    meta: { requiresAuth: true, requiresEmployee: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "rooms",
        name: "rooms",
        component: () => import("@/views/Rooms.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "bookings",
        name: "bookings",
        component: () => import("@/views/Bookings.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "clients",
        name: "clients",
        component: () => import("@/views/Clients.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "employer",
        name: "Employees",
        component: () => import("@/views/Employees.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "department",
        name: "Department",
        component: () => import("@/views/Department.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "payments",
        name: "Payments",
        component: () => import("@/views/PaymentView.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
      {
        path: "analytics",
        name: "Analytics",
        component: () => import("@/views/Analitycs.vue"),
        meta: { requiresAuth: true, requiresEmployee: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// router/index.js
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // User ma'lumotlarini yuklash - sync usulda
  if (!authStore.user && authStore.token) {
    authStore.loadUser();
  }

  // Auth kerak bo'lgan sahifalar
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      if (to.path !== "/login") {
        next("/login");
      } else {
        next();
      }
      return;
    }

    // Xodim sahifalari uchun tekshirish
    if (to.meta.requiresEmployee && !authStore.isEmployee()) {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
      return;
    }

    // Admin sahifalari uchun tekshirish
    if (to.meta.requiresAdmin && !authStore.isAdmin()) {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
      return;
    }
  }

  // Faqat mehmonlar uchun sahifalar
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    if (authStore.isEmployee()) {
      if (to.path !== "/dashboard") {
        next("/dashboard");
      } else {
        next();
      }
    } else {
      if (to.path !== "/") {
        next("/");
      } else {
        next();
      }
    }
    return;
  }

  next();
});
export default router;
