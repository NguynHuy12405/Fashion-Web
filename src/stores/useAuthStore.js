import { create } from "zustand";
import { users } from "../mockData/data";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,

  // LOGIN bằng mockData
  login: (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Email hoặc mật khẩu không đúng" };
    }

    const fakeToken = "FAKE_TOKEN_" + Date.now();

    // lưu localStorage
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(foundUser));

    set({ token: fakeToken, user: foundUser });

    return { success: true, role: foundUser.role };
  },

  // REGISTER (thêm user mới)
  register: (name, email, password) => {
    const exists = users.find((u) => u.email === email);

    if (exists) {
      return { success: false, message: "Email đã tồn tại!" };
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: "user",
    };

    users.push(newUser);

    const fakeToken = "FAKE_TOKEN_" + Date.now();

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    set({ token: fakeToken, user: newUser });

    return { success: true };
  },

  // Cập nhật user
  updateUser: (newUserData) => {
    localStorage.setItem("user", JSON.stringify(newUserData));
    set({ user: newUserData });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ token: null, user: null });
  },
}));
