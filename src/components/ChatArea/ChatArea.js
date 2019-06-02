import * as React from "react";
import { connect } from "react-redux";
import { scrollToBottom } from "../../utils/common";
import { PropTypes } from "prop-types";
import StyledChatArea from './StyledChatArea';
import Message from "../Message";

export class ChatArea extends React.Component {

  static propTypes = {
    messages: PropTypes.array,
    username: PropTypes.string,
  };

  chatAreaRef = React.createRef();

  render() {
    const { messages } = this.props;
    return (

        <StyledChatArea ref={this.chatAreaRef}>
        {messages && messages.map((msg, idx) => {
          return (
            <React.Fragment key={idx}>
              <Message message={msg} /> 
            </React.Fragment>
          );
        })}
      </StyledChatArea>
    );
  }

  componentDidUpdate() {
    const chatAreaElement = this.chatAreaRef.current;
    const shouldScroll =
      chatAreaElement.scrollTop + chatAreaElement.clientHeight !==
      chatAreaElement.scrollHeight;
    if (shouldScroll) {
      scrollToBottom(chatAreaElement);
    }
  }
}

const mapStateToProps = state => ({
  messages: state.messageState.messages,
  username: state.messageState.username
});

export default connect(mapStateToProps)(ChatArea);

