import * as React from "react";
import ChatArea from "../../components/ChatArea/ChatArea";
import MessageSender from "../../components/MessageSender/MessageSender";
import StyledPageContainer from '../../components/StyledPageContainer/StyledPageContainer';

const ChatPage = () => (
  <StyledPageContainer>
    <ChatArea />
    <MessageSender />
  </StyledPageContainer>
);

export default ChatPage;
