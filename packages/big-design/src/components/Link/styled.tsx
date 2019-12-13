import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../mixins';
import { withTransition } from '../../mixins/transitions';

import { LinkProps } from './Link';

export const StyledLink = styled.a<LinkProps & { isExternal?: boolean }>`
  ${withMargins()};
  ${withTransition(['color'], '70ms')}

  color: ${({ theme }) => theme.colors.link};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-decoration: none;

  &:active {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  &:hover:not(:active) {
    color: ${({ theme }) => theme.colors.linkHover};
  }

  ${({ isExternal, theme }) =>
    isExternal &&
    css`
      display: inline-flex;
      align-items: center;

      svg {
        margin-left: ${theme.spacing.xxSmall};
      }
    `}
`;

StyledLink.defaultProps = { theme: defaultTheme };
