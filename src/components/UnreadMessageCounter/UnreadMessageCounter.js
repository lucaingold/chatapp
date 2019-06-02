import * as React from 'react';
import { Label } from 'semantic-ui-react'

class UnreadMessagesCounter extends React.Component {
  render() {
    const {count} = this.props;

    return (
      count > 0 && <Label color='teal'>
        {count}
      </Label>
    );
  }
}

export default UnreadMessagesCounter;