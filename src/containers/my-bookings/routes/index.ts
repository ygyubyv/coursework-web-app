import MyBookingsView from "../views/MyBookingsView.vue";

export default [
  {
    path: "/my-bookings",
    name: "my-bookings",
    component: MyBookingsView,

    meta: {
      requiresAuth: true,
    },
  },
];
