import * as React from "react";
import Emojify from "react-emojione";
import MicrolinkCard from "@microlink/react";
import Linkify from "linkifyjs/react";
import * as getUrls from "get-urls";
import { PropTypes } from "prop-types";
import Timestamp from "../Timestamp";
import Username from "../Username";
import StyledMessage from "./StyledMessage";

class Message extends React.Component {
  static propTypes = {
    from: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const { message } = this.props;
    return (
      <React.Fragment>
        <div id="username-container">
          {message.type === "received" && <Username value={message.from} />}
          <Timestamp
            value={message.time}
            floatToRight={message.type === "sent"}
          />
        </div>
        <StyledMessage type={message.type}>
          <Linkify>
            <Emojify>
              {message.content} {this.parseURLs(message.content)}
            </Emojify>
          </Linkify>
        </StyledMessage>
      </React.Fragment>
    );
  }

  parseURLs = text => {
    const urls = getUrls(text);
    if (!urls.size) {
      return;
    }
    const parsedUrls = Array.from(urls).map((url, idx) => (
      <MicrolinkCard url={url} key={idx} />
    ));
    return <React.Fragment>{parsedUrls}</React.Fragment>;
  };
}

export default Message;
