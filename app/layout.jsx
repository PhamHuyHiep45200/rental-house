"use client";
import "./globals.css";
import ConfigAntd from "./components/context/ConfigAntd";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { useRef } from "react";
import LayoutDefault from "./components/layouts/default";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function RootLayout({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider store={storeRef.current}>
          <ConfigAntd>
            <LayoutDefault>{children}</LayoutDefault>
          </ConfigAntd>
        </Provider>
      </body>
    </html>
  );
}
