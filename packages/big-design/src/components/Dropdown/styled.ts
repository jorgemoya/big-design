import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { Box } from '../Box';

export const StyledLink = styled.a`
  ${withTransition(['background-color', 'color'])}

  align-items: center;
  color: ${({ theme }) => theme.colors.secondary70};
  display: flex;
  height: 100%;
  text-decoration: none;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const StyledBox = styled(Box)`
  position: relative;
  background-color: blue;
`;

StyledLink.defaultProps = { theme: defaultTheme };
StyledBox.defaultProps = { theme: defaultTheme };
