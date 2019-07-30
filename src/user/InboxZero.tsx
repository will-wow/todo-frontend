import React from "react";
import { Card, Heading, Flex } from "rebass";
import { connect } from "react-redux";

import { Store } from "../redux/reducers";
import { getUsername } from "./redux/selectors";

interface InboxZeroProps {
  username: string;
}

const InboxZero: React.FC<InboxZeroProps> = ({ username }) => {
  return (
    <Card border="1px solid" borderColor="gray" px="2" py="4">
      <Flex>
        <Heading color="gray" mx="auto">
          Nice, {username}, you're done!
        </Heading>
      </Flex>
    </Card>
  );
};

export { InboxZero };

const mapStateToProps = (state: Store): InboxZeroProps => ({
  username: getUsername(state)
});

export default connect(mapStateToProps)(InboxZero);
