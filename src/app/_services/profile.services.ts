import {
  createServerProfile,
  deleteProfileAction,
  editSelectedProfileAction,
  getSelectedProfileAction,
  updateUserSelectedProfileAction,
} from "../(Backend)/actions/profileActions";
import {
  createProfile,
  editSelectedProfile,
  getSelectedProfile,
  handleLocalProfileDelete,
  updateSelectedProfile,
} from "../utils/localstorage";

export const createPreferedProfile = async (
  profileName: string,
  isSignedIn: boolean = false,
) => {
  if (isSignedIn) {
    console.log("using DB");
    //create profile
    createServerProfile(profileName);
  } else {
    console.log("using localstorage");
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
    editSelectedProfileAction(profileName, fn);
  } else {
    editSelectedProfile(profileName, selectedProfile, fn);
  }
};

export const getPreferedProfile = async (isSignedIn: boolean) => {
  if (isSignedIn) {
    console.log(isSignedIn);

    console.log(`using DB ${await getSelectedProfileAction()}`);
    return await getSelectedProfileAction();
  } else {
    console.log(`using LS ${getSelectedProfile()}`);
    return getSelectedProfile();
  }
};

export const updatePreferedProfile = async (
  profileName: string,
  isSignedIn: boolean,
): Promise<void> => {
  if (isSignedIn) {
    await updateUserSelectedProfileAction(profileName);
  } else {
    updateSelectedProfile(profileName);
  }
};

export const deletePreferedProfile = async (isSignedIn: boolean) => {
  if (isSignedIn) {
    await deleteProfileAction();
  } else {
    handleLocalProfileDelete();
  }
};
