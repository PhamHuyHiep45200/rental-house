import { Avatar, Button, Card, CardContent, Tooltip } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { act, useEffect, useState } from "react";
import { copyText, openZalo } from "@/utils/common.util";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openChat,
  startLoading,
  stopLoading,
} from "@/store/slide/common.slide";
import { useSnackbar } from "notistack";
import { setChangeFavorite } from "@/store/slide/auth.slide";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useFavoriteByIdQuery,
} from "@/service/rtk-query";

function InfoUser({ detail }) {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [favorite, setFavorite] = useState(false);

  const {
    data,
    isSuccess: favoriteSuccess,
    isError: favoriteError,
    isFetching: favoriteFetching,
    refetch,
  } = useFavoriteByIdQuery(
    {
      houseId: detail?.id,
      userId: user?.id,
    },
    {
      skip: !detail?.id || !user?.id,
    }
  );
  const [addFavorite, { isLoading, isSuccess, isError }] =
    useAddFavoriteMutation();
  const [
    deleteFavorite,
    {
      isLoading: loadingFavorite,
      isSuccess: deleteFavoriteSuccess,
      isError: deleteFavoriteError,
    },
  ] = useDeleteFavoriteMutation();

  const openChatModal = () => {
    dispatch(openChat());
  };

  const favoriteHouse = () => {
    if (favorite) {
      deleteFavorite({
        id: data.data.id,
      });
    } else {
      addFavorite({
        houseId: detail.id,
        userId: user?.id,
        // name: detail.title,
        active: true,
      });
    }
  };

  useEffect(() => {
    if (favoriteSuccess) {
      setFavorite(!!data.data);
    }
    if (favoriteError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [favoriteSuccess, favoriteFetching, favoriteError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setChangeFavorite(Math.random()));
      refetch();
    }
    if (isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isLoading || loadingFavorite) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading, loadingFavorite]);

  useEffect(() => {
    if (deleteFavoriteSuccess) {
      dispatch(setChangeFavorite(Math.random()));
      refetch();
    }
    if (deleteFavoriteError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [deleteFavoriteSuccess, deleteFavoriteError]);

  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <Avatar src={detail?.user?.avatar} sx={{ width: 60, height: 60 }}>
          {detail?.user?.username?.[0]}
        </Avatar>
        <span className="block mt-2 font-semibold">
          {detail?.user?.username}
        </span>
        <div className="my-2 font-semibold flex items-center space-x-2 text-primary">
          <PhoneInTalkOutlinedIcon />
          <Tooltip title="Zalo người đăng" arrow>
            <span
              className="underline cursor-pointer"
              onClick={() => openZalo(detail?.user?.phone)}
            >
              {detail?.user?.phone}
            </span>
          </Tooltip>
        </div>
      </CardContent>
      <div className="!flex flex-col px-2 !py-2">
        <Button
          fullWidth
          className="mb-2"
          variant="contained"
          color="success"
          onClick={openChatModal}
        >
          <MarkUnreadChatAltOutlinedIcon />
          <span className="ml-2">Nhắn Tin</span>
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={favoriteHouse}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          <span className="ml-2"> {favorite ? "Bỏ " : ""}Yêu Thích</span>
        </Button>
      </div>
    </Card>
  );
}

export default InfoUser;
