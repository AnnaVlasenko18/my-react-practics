import styled from 'styled-components';

const getBgColor = props => {
  switch (props.$variant) {
    case `primary`:
      return `green`;
    case `secondary`:
      return `yellow`;
    default:
      return `orange`;
  }
};

export const Title = styled.h1`
  margin-bottom: ${p => p.theme.spacing(6)};
  background-color: ${getBgColor};
`;

export const IconWrapper = styled.span`
  display: inline-block;
  color: purple;
`;
