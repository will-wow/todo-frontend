import { Text } from "rebass";
import styled from "styled-components";
import { borders, BordersProps } from "styled-system";

const Input = styled(Text)<BordersProps>(borders);

Input.defaultProps = {
  as: "input",
  p: 2,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "gray",
  fontSize: 1
};

export default Input;
