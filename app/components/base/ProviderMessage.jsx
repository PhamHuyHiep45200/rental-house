import { SnackbarProvider } from "notistack";
import React from "react";

function ProviderMessage(props) {
  const { children } = props;
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default ProviderMessage;
