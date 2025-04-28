import { InfoList } from "@/config/header.config";
import { getImage } from "@/service/frontend";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slide/auth.slide";
import { Avatar, List, ListItem, Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

function Info() {
  const { user } = useAppSelector((state) => state.authSlice);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const redirectPath = (path) => {
    if (path === "logout") {
      router.push("/login");
      localStorage.removeItem("auth");
      dispatch(setUser(null));
    } else {
      router.push(path);
    }
  };

  const CustomInfoList = useMemo(() => {
    if (user.role === "ADMIN") {
      return [
        {
          label: "Trang Quản Trị",
          path: "/admin",
        },
        ...InfoList,
      ];
    }
    return InfoList;
  }, [user]);

  return (
    <PopupState variant="popover" popupId="popup-popover">
      {(popupState) => (
        <div>
          <div
            className="flex items-center space-x-2"
            {...bindTrigger(popupState)}
          >
            <Avatar
              sx={{ height: 40, width: 40 }}
              alt={user?.username?.[0]}
              src={getImage(user?.avatar) ?? ""}
            />
            <span>{user?.username}</span>
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List sx={{ width: 180, bgcolor: "background.paper", padding: 0 }}>
              {CustomInfoList.map((info) => (
                <ListItem
                  key={info.path}
                  className="cursor-pointer font-semibold hover:bg-primary hover:bg-opacity-[0.3]"
                  onClick={() => {
                    redirectPath(info.path);
                    popupState.close();
                  }}
                >
                  {info.label}
                </ListItem>
              ))}
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default Info;
