import styled from 'styled-components';

const getBorderColors = props => {
  switch (props.$rank) {
    case 'novise':
      return 'yellow';
    case 'intermediate':
      return 'purple';
    case 'expert':
      return 'orange';
    default:
      return 'orangered';
  }
};

export const CardWrapeer = styled.div`
  border: 5px solid ${getBorderColors};
  border-radius: ${props => props.theme.radii.sm};
  padding: ${p => p.theme.spacing(2)};
`;

export const UsereFoto = styled.img`
  border-radius: ${p => p.theme.radii.md};
`;

export const Text = styled.p`
  margin-top: ${p => p.theme.spacing(2)};
  margin-bottom: ${p => p.theme.spacing(2)};

  color: ${props => props.theme.colors.accent};

  &:hover,
  &:focus {
    background-color: ${p => p.theme.colors.yellow};
  }
`;

export const Accent = styled.b`
  color: ${p => p.theme.colors.accent};
`;
