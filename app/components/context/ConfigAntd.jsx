"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

function ConfigAntd({ children }) {
  return <AntdRegistry>{children}</AntdRegistry>;
}

export default ConfigAntd;
