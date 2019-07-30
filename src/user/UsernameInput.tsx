import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import Input from "../theme/Input";
import { Store } from "../redux/reducers";
import { getUsername } from "./redux/selectors";
import { updateUsername } from "./redux/actions";

interface StateToProps {
  username: string;
}

interface DispatchFromProps {
  updateUsername: (username: string) => void;
}

interface UsernameInputProps extends StateToProps, DispatchFromProps {}

const UsernameInput: React.FC<UsernameInputProps> = ({
  username,
  updateUsername
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateUsername(event.target.value);

  return (
    <Input
      value={username}
      onChange={handleChange}
      placeholder="Enter your name here"
    />
  );
};

export { UsernameInput };

const mapStateToProps = (state: Store): StateToProps => ({
  username: getUsername(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps =>
  bindActionCreators(
    {
      updateUsername
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameInput);
