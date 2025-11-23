import axiosInstance from "@/plugins/axios";
import type { UserSummary } from "@/types";

const MOCK_USERS: UserSummary[] = [
  {
    avatarUrl: null,
    createdAt: "Tue, 21 Oct 2025 21:08:05 GMT",
    email: "vasilkozubovich@gmail.com",
    id: "d06aa262-6c39-4cb1-bef7-233f22c36727",
    name: "Vasil Kozubovich",
    phoneNumber: null,
    roles: ["user"],
  },
  {
    avatarUrl: null,
    createdAt: "Tue, 11 Nov 2025 16:24:30 GMT",
    email: "ponoszapor1@gmail.com",
    id: "4b826cd0-4492-43cc-b004-2fa69c8e39c7",
    name: "unknown",
    phoneNumber: null,
    roles: ["user"],
  },
  {
    avatarUrl: null,
    createdAt: "Wed, 12 Nov 2025 11:06:03 GMT",
    email: "test@gmail.com",
    id: "09bb9add-9fd6-4c8e-879f-dd4a22894ac4",
    name: "test",
    phoneNumber: null,
    roles: ["user"],
  },
  {
    avatarUrl: null,
    createdAt: "Sat, 15 Nov 2025 13:18:37 GMT",
    email: "sparagovskiu@knu.ua",
    id: "a5b730b7-af4d-4bb5-bc80-400e8adefd8c",
    name: "Владислав Шпараговський",
    phoneNumber: null,
    roles: ["user"],
  },
  {
    avatarUrl: null,
    createdAt: "Fri, 21 Nov 2025 01:43:18 GMT",
    email: "bibel1211@gmail.com",
    id: "45c53ca9-37bf-44a1-9203-0398cb384053",
    name: "Bibel",
    phoneNumber: null,
    roles: ["user"],
  },
  {
    avatarUrl:
      "https://virodip.blob.core.windows.net/avatars/b2983e05-4d77-4588-8ecb-fe80168b5aac-1763505126.jpg",
    createdAt: "Sun, 19 Oct 2025 19:26:34 GMT",
    email: "vasys004@gmail.com",
    id: "b2983e05-4d77-4588-8ecb-fe80168b5aac",
    name: "full master",
    phoneNumber: "+380687586410",
    roles: ["user", "guardian", "admin", "owner"],
  },
];

export const getUser = async (id: string) => {
  const response = await axiosInstance.get<UserSummary>(`/users/${id}`);
  return response.data;
};

// Temporary mock implementation
export const getUsers = async (): Promise<UserSummary[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_USERS;
};

// export const getUsers = async () => {
//   const response = await axiosInstance.get<IUser[]>(`/users`);
//   return response.data;
// };
