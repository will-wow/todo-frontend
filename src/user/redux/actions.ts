interface UpdateUsername {
  type: "user::UpdateUsername";
  payload: {
    username: string;
  };
}

export type UserAction = UpdateUsername;

export const updateUsername = (username: string): UpdateUsername => ({
  type: "user::UpdateUsername",
  payload: {
    username
  }
});
