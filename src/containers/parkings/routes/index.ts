import ParkingsView from "../views/ParkingsView.vue";

export default [
  {
    path: "/parkings",
    name: "parkings",
    component: ParkingsView,

    meta: {
      requiresAuth: true,
    },
  },
];
