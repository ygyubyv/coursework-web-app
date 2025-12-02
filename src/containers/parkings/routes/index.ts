export default [
  {
    path: "/parkings/list",
    name: "parkings",
    meta: {
      requiresAdmin: true,
    },
    component: () => import("../views/ParkingsListView.vue"),
  },
];
