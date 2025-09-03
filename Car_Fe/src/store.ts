import { create } from "zustand";

type AuthStore = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}
//export 밖에서 inport해서 쓸수있게해준다.
export const useAuthStore = create<AuthStore>((set) => ({   //create는 usestate와 비슷하다
    isAuthenticated: !!sessionStorage.getItem("jwt"), //!!(느낌표2개)붙이면 truthy/falsy 값을 명확한 Boolean 값으로 바꾸는 용도
    login: () => set({isAuthenticated: true}),
    logout: () => set({isAuthenticated: false})
})) 