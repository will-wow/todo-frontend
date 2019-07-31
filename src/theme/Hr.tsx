import styled from "styled-components";

import {
  borderColor,
  BorderColorProps,
  borderWidth,
  BorderWidthProps
} from "styled-system";

const Hr = styled.hr<BorderWidthProps & BorderColorProps>(
  { borderStyle: "solid" },
  borderColor,
  borderWidth
);

Hr.defaultProps = {
  borderColor: "red",
  borderWidth: 1
};

export default Hr;
