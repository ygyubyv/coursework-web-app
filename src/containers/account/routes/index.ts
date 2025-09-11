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
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
      },
      {
        path: "payments",
        name: "payments",
        component: PaymentsView,
      },
      {
        path: "security",
        name: "security",
        component: SecurityView,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsView,
      },
      {
        path: "stats",
        name: "stats",
        component: StatsView,
      },
    ],
  },
];
