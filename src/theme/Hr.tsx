import React from "react";
import { Box, BoxProps } from "rebass";

const Hr: React.FC<BoxProps> = props => (
  <Box as="hr" bg={props.color} style={{ border: 1, height: 1 }} {...props} />
);

export default Hr;
