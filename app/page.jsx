"use client";
import { Container, Divider } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { lazy } from "react";
import HeaderProduct from "./components/base/HeaderProduct";
import DataHouse from "./components/home/DataHouse";
import Search from "./components/home/Search";
import Slide from "./components/home/Slide";
import RandomPair from "./components/home/dataHouse/RandomPair";

function Index() {
  return (
    <div className="">
      <HeaderProduct
        icon={
          <FavoriteIcon
            color="primary"
            sx={{ width: 40, height: 40, color: "white" }}
          />
        }
        center
        color="#d20000"
        textColor="white"
        title={"Được Thích Nhiều Nhất"}
      />
      <Slide />
      <Container>
        <Search />
      </Container>
      <Divider className="mt-10" />
      <HeaderProduct
        icon={<GroupAddIcon sx={{ width: 40, height: 40, color: "white" }} />}
        center
        color="#1976d2"
        textColor="white"
        title={"Tìm Người Ở Ghép"}
      />
      <RandomPair />
      <Divider />
      <Container>
        <div className="mt-[60px]">
          <DataHouse />
        </div>
      </Container>
    </div>
  );
}

export default Index;
