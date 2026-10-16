"use client";

import { getUser } from "../(Backend)/actions/userActions";
import { getLocalUser } from "../utils/localstorage";

export const getPreferedUser = async () => {
  try {
    const res = await getUser();
    if (res.success) {
      return res.data;
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    return getLocalUser();
  }
};
