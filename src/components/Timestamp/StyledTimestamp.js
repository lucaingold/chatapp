import styled from 'styled-components';


const StyledTimestamp = styled("div")`
  font-size: .7em;
  float: ${props => props.floatToRight ? 'right' : 'left'};
  margin: 7px 0 0 4px;
`;

export default StyledTimestamp;