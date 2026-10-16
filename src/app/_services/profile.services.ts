import {
  createProfile,
  editSelectedProfile,
  getSelectedProfile,
  updateSelectedProfile,
} from "../utils/localstorage";

export const createPreferedProfile = (
  profileName: string,
  isSignedIn: boolean = false,
) => {
  if (isSignedIn) {
    //
  } else {
    createProfile(profileName);
  }
};

export const editPreferedProfile = (
  profileName: string,
  selectedProfile: string,
  isSignedIn: boolean,
  fn?: () => void,
) => {
  if (isSignedIn) {
    //
  } else {
    editSelectedProfile(profileName, selectedProfile, fn);
  }
};

export const getPreferedProfile = (isSignedIn: boolean) => {
  if (isSignedIn) {
    return "Guest";
  } else {
    return getSelectedProfile();
  }
};

export const updatePreferedProfile = (
  profileName: string,
  isSignedIn: boolean,
) => {
  if (isSignedIn) {
    //
  } else {
    updateSelectedProfile(profileName);
  }
};
