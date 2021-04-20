import firebase from "../../firebase/config";

export const AddUser = async (username, name, email, uid, profileImg) => {
  try {
    return await firebase
      .database()
      .ref("users/" + username)
      .set({
        name: name,
        email: email,
        uid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (uid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
