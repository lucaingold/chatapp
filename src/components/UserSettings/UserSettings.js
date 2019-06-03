import * as React from "react";
import { connect } from "react-redux";
import {
  readRecord,
  storeToLocalStorageDebounced
} from "../../utils/localStorageService";
import { changeUsername } from "../../store/message/actions";
import { PropTypes } from "prop-types";
import { Form } from "semantic-ui-react";

export class UserSettings extends React.Component {
  static propTypes = {
    username: PropTypes.string
  };
  state = {
    username: readRecord("username") || "icognito"
  };

  constructor(props) {
    super(props);
    this.setState({
      username: this.props.username 
    });
  }

  render() {
    const { username } = this.state;
    return (
      <Form.Field>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleUserNameChange}
        />
      </Form.Field>
    );
  }

  handleUserNameChange = e => {
    this.setState({ username: e.currentTarget.value });
    storeToLocalStorageDebounced("username", e.currentTarget.value);
    this.props.changeUsername(e.currentTarget.value);
  };
}

const mapStateToProps = state => {
  return {
    username: state.messageState.username
  };
};

// Map dispatch function into props
const mapDispatchToProps = dispatch => ({
  changeUsername: username => dispatch(changeUsername(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
