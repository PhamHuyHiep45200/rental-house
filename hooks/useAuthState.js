import { useAppSelector } from "@/store/hooks";

const useAuthState = () => {
  return useAppSelector((state) => state.authSlice);
};

export default useAuthState;
