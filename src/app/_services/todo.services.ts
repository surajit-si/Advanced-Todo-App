import { createTodoLocal } from "../_components/navbar/localstorage";

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
    //
  } else {
    createTodoLocal({ task, description, deadline, tags, selectedProfile });
  }
};
