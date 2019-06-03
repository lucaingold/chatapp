import * as React from "react";
import { PropTypes } from "prop-types";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { sendMessage } from "../../store/message/actions";
import { readRecord } from "../../utils/localStorageService";
import { getTime24hours } from "../../utils/common";
import StyledMessageSender from "./StyledMessageSender";

const KEY_CODES = {
  ENTER: "Enter",
  CTRL: "Control"
};

export class MessageSender extends React.Component {
  static propTypes = {
    sendMessage: PropTypes.func
  };

  state = {
    username: readRecord("username") || "icognito",
    chatMessage: ""
  };

  constructor(props){
    super(props);
    this.setState({
      username: this.props.username 
    });
  }
  messagesInputRef = React.createRef();
  pressedKeysMap = {};

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = () => {
    this.pressedKeysMap = {};
  };

  handleKeyPress = e => {
    this.pressedKeysMap[e.key] = e.type === "keydown";
    this.sendOnPressEnter();
  };

  sendOnPressEnter = () => {
    if (
      KEY_CODES.ENTER in this.pressedKeysMap &&
      !(KEY_CODES.CTRL in this.pressedKeysMap)
    ) {
      this.sendChatMessage();
      this.cleanMessageInput();
    }
  };

  handleOnChange = e => {
    this.setState({ chatMessage: e.currentTarget.value });
  };

  handleClick = () => {
    this.sendChatMessage();
    this.cleanMessageInput();
  };

  sendChatMessage = () => {
    const { username, chatMessage } = this.state;
    if (chatMessage !== "") {
      this.props.sendMessage({
        from: username,
        content: chatMessage,
        time: getTime24hours()
      });
    }
  };

  cleanMessageInput = () => {
    this.setState({ chatMessage: "" });
    if (this.messagesInputRef.current) {
      this.messagesInputRef.current.focus();
    }
  };

  render() {
    const { chatMessage } = this.state;

    return (
      <StyledMessageSender>
        <input
          id="send-message-input"
          type="text"
          ref={this.messagesInputRef}
          value={chatMessage}
          onChange={this.handleOnChange}
        />
        <button id="send-message-btn" onClick={this.handleClick}>
          <Icon name="send" size='large' inverted />
        </button>
      </StyledMessageSender>
    );
  }
}
const mapStateToProps  = state => {
  return {
    username: state.messageState.username
  };
};

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageSender);
