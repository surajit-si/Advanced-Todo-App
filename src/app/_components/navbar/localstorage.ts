import { useRouter } from "next/router";
import { Dispatch } from "react";

export type IUser = {
  name: string;
  profiles: IProfile[];
  selsectedProfile: string;
};

export type IProfile = {
  name: string;
  todos: ITodo[];
};

export type ITodo = {
  task: string;
  deadline: Date;
  tags: string[];
  isCompleted: boolean;
  description: string;
  createdAt: Date;
  completedAt: Date | null;
  reminderAt?: Date;
};

export function createLocalStorageTemplate() {
  const todoApp = window.localStorage.getItem("todoApp");

  if (!todoApp) {
    window.localStorage.setItem(
      "todoApp",
      JSON.stringify({
        name: "GUEST",
        selsectedProfile: "Guest",
        profiles: [{ name: "Guest", todos: [] }],
      }),
    );
  }
}

export function getLocalUser() {
  const todoApp = localStorage.getItem("todoApp");
  if (!todoApp) {
    createLocalStorageTemplate();
    const router = useRouter();
    router.reload();
  }

  const todoObj: IUser = JSON.parse(todoApp as string);
  return todoObj;
}

export function createProfile(profileName: string) {
  const user: IUser = JSON.parse(localStorage.getItem("todoApp") as string);
  if (!user) {
    console.error("user in local storagfe not found!");
    return;
  }

  const newuser: IUser = {
    ...user,
    profiles: [...user.profiles, { name: profileName, todos: [] }],
  };

  localStorage.setItem("todoApp", JSON.stringify(newuser));

  const newTodoApp = JSON.parse(localStorage.getItem("todoApp") as string);
  return newTodoApp;
}

export function editSelectedProfile(
  profileName: string,
  selectedProfile: string,
  fn?: () => void,
) {
  const user: IUser = JSON.parse(localStorage.getItem("todoApp") as string);
  console.log(user);

  if (!user) {
    console.log(selectedProfile);

    console.error("user in local storagfe not found!");
    return;
  }

  const profileIdx = user.profiles.findIndex(
    (profile) => profile.name === selectedProfile,
  );

  if (profileIdx === -1) {
    console.error("profile not found!");
    return;
  }

  user.profiles[profileIdx].name = profileName;

  //update the user
  localStorage.setItem("todoApp", JSON.stringify(user));

  //call the executable function
  if (fn) {
    fn(profileName);
  }
}

export function getSelectedProfile(): string {
  const user: IUser = JSON.parse(localStorage.getItem("todoApp") as string);
  if (!user) {
    console.error("user in local storagfe not found!");
  }
  return user.selsectedProfile;
}

export function updateSelectedProfile(profileName: string) {
  const user: IUser = JSON.parse(localStorage.getItem("todoApp") as string);
  if (!user) {
    console.error("user in local storagfe not found!");
    return;
  }

  user.selsectedProfile = profileName;
  localStorage.setItem("todoApp", JSON.stringify(user));
}
