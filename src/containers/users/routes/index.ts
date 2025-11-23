import UsersView from "../views/UsersView.vue";

export default [
  {
    path: "/users",
    name: "users",
    meta: {
      requiresAdmin: true,
    },
    component: UsersView,
  },
];
