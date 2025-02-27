import { Badge, Button, Container } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import PopUpChat from "./header/PopUpChat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Info from "./header/Info";
import { userQuery } from "@/store/service/user.service";

function Header() {
  const { popupChat } = useAppSelector((state) => state.commonSlice);
  const { favorite, user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const redirect = (path) => {
    router.push(path);
  };
  return (
    <div className="fixed top-0 left-0 right-0 h-20 flex items-center z-10 bg-[#ffba00] bg-opacity-[0.9]">
      {popupChat && <PopUpChat />}
      <Container className="!flex justify-between items-center">
        <div className="flex items-center justify-center space-x-3">
          <Image
            alt="logo-phongtro123"
            src="https://phongtro123.com/images/logo-phongtro.svg"
            width={240}
            height={70}
            onClick={() => redirect("/")}
          />
          {user && (
            <Button variant="contained" onClick={() => redirect("/post")}>
              Đăng Bài
            </Button>
          )}
        </div>
        {user ? (
          <div className="flex space-x-8 justify-between items-center">
            <Badge
              badgeContent={favorite}
              color="error"
              className="cursor-pointer"
              onClick={() => {
                dispatch(userQuery.util.resetApiState());
                redirect("/favorite");
              }}
            >
              <FavoriteOutlinedIcon className="text-[red] text-[35px]" />
            </Badge>
            <Info />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Button variant="contained" onClick={() => redirect("/login")}>
              Đăng Nhập
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => redirect("/register")}
            >
              Đăng Ký
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Header;
