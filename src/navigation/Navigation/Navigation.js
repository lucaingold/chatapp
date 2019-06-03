import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connectSocket } from "../../store/socket/actions";
import { NavLink } from "react-router-dom";
import UnreadMessagesCounter from "../../components/UnreadMessageCounter";
import { isPageActive } from "../../utils/common";
import { Sticky, Menu, Image, Icon } from "semantic-ui-react";

export class Navigation extends React.Component {
  static propTypes = {
    connectToSockets: PropTypes.func,
    receivedUnreadMessages: PropTypes.array,
    messages: PropTypes.array,
    username: PropTypes.string,
    unreadMessages: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.intl = this.props.intl;
    this.state = {
      unreadMessages: 0,
      receivedUnreadMessages: []
    };
  }

  componentDidMount() {
    this.props.connectToSockets();
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (
      prevProps.messages.length !== messages.length &&
      isPageActive("settings")
    ) {
      const lastMessage = messages[messages.length - 1];
      this.setState(
        {
          receivedUnreadMessages: [
            ...this.state.receivedUnreadMessages,
            lastMessage
          ]
        },
        () => {
          this.updateUnreadMessagesCount();
        }
      );
    }
  }

  render() {
    const { unreadMessages } = this.state;

    return (
      <Sticky context={this.contextRef}>
        <Menu>
          <Menu.Item header={true}>
            <Image
              size="tiny"
              src="https://www.bbv.ch/templates/bbv2015/images/logo.svg"
            />
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact={true}
            activeClassName="active"
            onClick={this.clearNotifications}
            to="/chat"
          >
            <Icon name="chat" />
            <span>Chat</span>
            <UnreadMessagesCounter count={unreadMessages} />
          </Menu.Item>

          <Menu.Item as={NavLink} activeClassName="active" to="/settings">
            <Icon name="settings" />
            <span>Einstellungen</span>
          </Menu.Item>

          <Menu.Item position="right">
            <Icon name="user" />
            <span>{this.props.username}</span>
          </Menu.Item>
        </Menu>
      </Sticky>
    );
  }

  updateUnreadMessagesCount = () => {
    this.setState({
      unreadMessages: this.state.receivedUnreadMessages.length
    });
  };

  clearNotifications = () => {
    this.setState({ unreadMessages: 0, receivedUnreadMessages: [] });
  };
}

const mapStateToProps = state => ({
  messages: state.messageState.messages,
  username: state.messageState.username
});

const mapDispatchToProps = dispatch => {
  return { connectToSockets: () => dispatch(connectSocket()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
