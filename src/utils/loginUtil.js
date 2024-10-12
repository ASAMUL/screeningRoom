import { useLoginModalStore } from "@/stores/loginModal";

export function showLoginModal() {
  const loginModalStore = useLoginModalStore();
  loginModalStore.showLoginModal();
}

export function hideLoginModal() {
  const loginModalStore = useLoginModalStore();
  loginModalStore.hideLoginModal();
}

