import AccountView from "../views/AccountView.vue";
import ProfileView from "../views/ProfileView.vue";
import PaymentsView from "../views/PaymentsView.vue";
import SecurityView from "../views/SecurityView.vue";
import SettingsView from "../views/SettingsView.vue";
import StatsView from "../views/StatsView.vue";

export default [
  {
    path: "/account",
    component: AccountView,
    children: [
      {
        path: "",
        redirect: "/account/profile",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "payments",
        name: "payments",
        component: PaymentsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "security",
        name: "security",
        component: SecurityView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "stats",
        name: "stats",
        component: StatsView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];
