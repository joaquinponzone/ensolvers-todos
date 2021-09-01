import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Todo } from "../types/interfaces";
import store from "../store";
import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect } from "react";

interface Props {
  item: Todo;
  open: boolean;
  setOpenEditModal: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 500,
      [theme.breakpoints.down("xs")]: {
        width: 300,
      },
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "1rem",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: theme.spacing(4, 4, 2),
    },
  })
);

export default function TodoItem({ item, open, setOpenEditModal }: Props) {
  const classes = useStyles();
  const [editedText, setEditedText] = React.useState<string>("");

  useEffect(() => {
    setEditedText(item.text);
  }, [item]);

  const handleClose = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setOpenEditModal(false);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    store.editTodo({ ...item, text: editedText });
    setOpenEditModal(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Typography variant={"h5"}>{`Edit task "${item.text}"`}</Typography>
            <TextField
              className={classes.form}
              value={editedText}
              defaultValue={item.text}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                setEditedText(evt.target.value);
              }}
            />
            <div className={classes.buttons}>
              <Button variant='contained' type='submit' color='primary'>
                Save
              </Button>
              <Button
                variant='contained'
                onClick={handleClose}
                style={{ marginLeft: "2rem" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
