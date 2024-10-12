import { useUserStore } from "@/stores/user";

export function isLoggedIn() {
  const userStore = useUserStore();
  return userStore.isLoggedIn;
}

export function getToken() {
  const localUser = localStorage.getItem("user");
  if (!localUser) return null;
  const user = JSON.parse(localUser);
  return user.token;
}
