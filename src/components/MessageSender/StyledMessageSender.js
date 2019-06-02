import styled from 'styled-components';

const StyledMessageSender = styled("section")`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #F2F2F2;
  padding:5px;
  box-shadow: 0 -5px 5px -5px #ccc;

  
  input {
    width: 90%;
    line-height: 42px;
    font-size: 1.1em;
    box-sizing: border-box;
    padding: 7px;
    outline: none;
    box-shadow: none !important;
    border: 1px solid #cccccc !important;
  }
  
  input:focus {
    outline: none;
  }

  button {
    background-color: #D80F2A;
    width: 10%;
    height: 60px;
    border: none;
  }

  button:active{
    outline: none;
    background-color: #666666;
  }
`;

export default StyledMessageSender;