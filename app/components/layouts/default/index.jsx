import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import {
  useGetMeQuery,
  useUserFavoriteQuery,
} from "@/store/service/user.service";
import {
  setUser,
  setInfo,
  setFavorite,
  setAuth,
} from "@/store/slide/auth.slide";
import { Divider } from "@mui/material";

export default function LayoutDefault({ children }) {

  const { checkChangeUser, changeFavorite, user, auth } = useAppSelector(
    (state) => state.authSlice
  );
  const dispatch = useAppDispatch();

  const { data, isFetching, isSuccess, refetch } = useGetMeQuery(
    {},
    {
      skip: !auth,
    }
  );
  const {
    data: dataFavorite,
    isSuccess: successFavorite,
    refetch: refreshFavorite,
  } = useUserFavoriteQuery(
    {},
    {
      skip: !user,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.data.user));
      dispatch(
        setInfo({
          maxMoney: data.data.maxMoney,
          maxSquare: data.data.maxSquare,
          minMoney: data.data.minMoney,
          minSquare: data.data.minSquare,
        })
      );
    }
  }, [isFetching, isSuccess]);

  useEffect(() => {
    if (successFavorite) {
      dispatch(setFavorite(dataFavorite.data.data.length));
    }
  }, [dataFavorite, successFavorite]);

  useEffect(() => {
    if (checkChangeUser) {
      refetch();
    }
  }, [checkChangeUser]);

  useEffect(() => {
    if (changeFavorite) {
      refreshFavorite();
    }
  }, [changeFavorite]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, []);

  return (
    <>
      <header className="bg-white">
        <Header />
      </header>
      <main className="mt-20 bg-[whitesmoke] min-h-[100vh] pb-10 pt-10">
        {children}
      </main>
      <Divider />
      <Footer />
    </>
  );
}