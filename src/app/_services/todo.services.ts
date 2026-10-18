import { createTodo } from "../(Backend)/actions/todoActions";
import {
  createTodoLocal,
  deleteTodoLocal,
  markTodoLocalState,
} from "../utils/localstorage";

export const createPreferedTodo = (
  {
    task,
    description,
    deadline,
    tags,
    selectedProfile,
  }: {
    selectedProfile: string;
    task: string;
    description?: string;
    deadline: Date;
    tags: string[];
  },
  isSignedIn: boolean,
) => {
  if (isSignedIn) {
    createTodo({ task, description, deadline, tags });
  } else {
    createTodoLocal({ task, description, deadline, tags, selectedProfile });
  }
};

export const deletePreferedTodo = (todoId: string, isSignedIn: boolean) => {
  if (isSignedIn) {
    //
  } else {
    deleteTodoLocal(todoId);
  }
};

export const markPreferedTodoState = (
  todoId: string,
  currentState: "completed" | "pending",
  isSignedIn: boolean,
) => {
  if (isSignedIn) {
    //
  } else {
    markTodoLocalState(todoId, currentState);
  }
};
