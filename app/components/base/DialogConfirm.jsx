import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogConfirm({
  openDialog,
  onClose,
  onSubmit,
  title,
  textContent,
  textSubmit,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose?.(false);
  };

  const onSubmitDialog = () => {
    onSubmit?.();
  };

  React.useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: "400px" }}>
        <DialogContentText id="alert-dialog-slide-description">
          {textContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmitDialog} variant="contained">
          {textSubmit}
        </Button>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
