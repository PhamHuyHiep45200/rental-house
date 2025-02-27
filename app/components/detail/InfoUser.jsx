import { Avatar, Button, Card, CardContent, Tooltip } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { copyText } from "@/utils/common.util";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openChat,
  startLoading,
  stopLoading,
} from "@/store/slide/common.slide";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useFavoriteByIdQuery,
} from "@/store/service/user.service";
import { useSnackbar } from "notistack";
import { setChangeFavorite } from "@/store/slide/auth.slide";

function InfoUser({ detail }) {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [favorite, setFavorite] = useState(true);

  const {
    data,
    isSuccess: favoriteSuccess,
    isError: favoriteError,
    isFetching: favoriteFetching,
    refetch,
  } = useFavoriteByIdQuery({
    house: detail._id,
  });
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
        id: detail._id,
        data: { active: false },
      });
    } else {
      addFavorite({
        house: detail._id,
        user: user?._id,
      });
    }
  };

  useEffect(() => {
    if (favoriteSuccess) {
      setFavorite(data.data);
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
          <Tooltip title="Sao Chép" arrow>
            <span
              className="underline cursor-pointer"
              onClick={() => copyText("0397349543")}
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
