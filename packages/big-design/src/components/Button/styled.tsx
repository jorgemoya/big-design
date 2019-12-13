import { addValues, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins, MarginProps } from '../../mixins';
import { withTransition } from '../../mixins/transitions';
import { Flex } from '../Flex';

import { ButtonProps } from './index';

export const StyledButton = styled.button<ButtonProps & MarginProps>`
  ${withTransition(['background-color', 'border-color', 'box-shadow', 'color'])}

  && {
    ${withMargins()};
  }

  align-items: center;
  appearance: none;
  border: ${({ theme }) => theme.border.box};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  flex: none;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  justify-content: center;
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  outline: none;
  padding: ${({ theme }) => `0 ${theme.spacing.medium}`};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;

  &:focus {
    outline: none;
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.colors.border};
    pointer-events: none;
  }

  & + .bd-button {
    margin-top: ${({ theme }) => theme.spacing.xSmall};

    ${({ theme }) => theme.breakpoints.tablet} {
      margin-top: ${({ theme }) => theme.spacing.none};
      margin-left: ${({ theme }) => theme.spacing.xSmall};
    }
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    width: auto;
  }

  ${({ iconOnly: icon, theme }) =>
    icon &&
    css`
      padding: 0 ${theme.spacing.xSmall};
    `};

  ${({ iconLeft, theme }) =>
    iconLeft &&
    css`
      padding-left: ${theme.spacing.xSmall};
    `};

  ${({ iconRight, theme }) =>
    iconRight &&
    css`
      padding-right: ${theme.spacing.xSmall};
    `};

  ${props => getButtonStyles(props)}
`;

export const ContentWrapper = styled.span.attrs<{}, { isLoading?: boolean }>({})`
  align-content: center;
  align-items: center;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export const LoadingSpinnerWrapper = styled(Flex)`
  position: absolute;
`;

/**
 * These can be generated dynamically but I'm leaning towards being extra
 * explicit and being able to handle corner cases and changes from design easily
 */
const ButtonPrimary = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActive};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocus}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

const ButtonPrimaryDestructive = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActiveDestuctive};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocusDestructive}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHoverDestructive};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

const ButtonSecondary = css<ButtonProps>`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActiveSecondary};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocus}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHoverSecondary};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

const ButtonSecondaryDestructive = css<ButtonProps>`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActiveSecondaryDestructive};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocusDestructive}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHoverSecondaryDestructive};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

const ButtonSubtle = css<ButtonProps>`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.primary};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActiveSecondary};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocus}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHoverSecondary};
  }

  &[disabled] {
    border-color: transparent;
    color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

const ButtonSubtleDestructive = css<ButtonProps>`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.danger};

  &:active {
    background-color: ${({ theme }) => theme.colors.buttonActiveSecondaryDestructive};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.buttonFocusDestructive}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.buttonHoverSecondaryDestructive};
  }

  &[disabled] {
    border-color: transparent;
    color: ${({ theme }) => theme.colors.buttonDisabled};
  }
`;

function getButtonStyles(props: ButtonProps) {
  const { actionType, variant } = props;

  switch (variant) {
    case 'primary':
      return actionType === 'destructive' ? ButtonPrimaryDestructive : ButtonPrimary;
    case 'secondary':
      return actionType === 'destructive' ? ButtonSecondaryDestructive : ButtonSecondary;
    case 'subtle':
      return actionType === 'destructive' ? ButtonSubtleDestructive : ButtonSubtle;
  }
}

StyledButton.defaultProps = { theme: defaultTheme };
ContentWrapper.defaultProps = { theme: defaultTheme };
LoadingSpinnerWrapper.defaultProps = { theme: defaultTheme };
