export default [
  {
    path: "/users",
    name: "users",
    meta: {
      requiresAdmin: true,
    },
    component: () => import("../views/UsersView.vue"),
  },

  {
    path: "/users/:id",
    name: "user",
    meta: {
      requiresAdmin: true,
    },
    component: () => import("../views/UserView.vue"),
  },
];
