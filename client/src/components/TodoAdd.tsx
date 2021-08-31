import * as React from "react";
import { observer } from "mobx-react";
import store from "../store";
import { Button, Grid, TextField } from "@material-ui/core";

function TodoAdd() {
  return (
    <Grid style={{ padding: "1rem" }} container justifyContent='center'>
      <TextField
        value={store.newTodo}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          (store.newTodo = evt.target.value)
        }
        placeholder='New todo'
      />
      <Button
        onClick={() => {
          store.addTodo({ text: store.newTodo, done: false });
        }}
      >
        Add Todo
      </Button>
    </Grid>
  );
}

export default observer(TodoAdd);
