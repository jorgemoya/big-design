import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { ListProps } from './List';

export const StyledList = styled.ul<Partial<ListProps>>`
  ${({ theme }) => theme.shadow.raised};

  ${props => !props.isOpen && hideVisually()}

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary70};
  margin: 0;
  max-height: ${({ theme, maxHeight }) => (maxHeight ? theme.helpers.remCalc(maxHeight) : '')};
  outline: none;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xSmall} 0;
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

StyledList.defaultProps = { theme: defaultTheme };
