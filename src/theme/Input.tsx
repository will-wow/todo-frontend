import React from "react";
import { Text, TextProps } from "rebass";

const Input: React.FC<TextProps> = props => (
  <Text as="input" p={2} {...props} />
);

export default Input;
