import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { Flex } from '../Flex';

import { ModalProps } from './Modal';

export const StyledModal = styled.div.attrs({
  'aria-modal': true,
  role: 'dialog',
  tabIndex: -1,
})<Partial<ModalProps>>`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};

  ${props =>
    props.backdrop &&
    props.variant &&
    css`
      background: ${rgba(props.theme.colors.secondary70, props.variant === 'dialog' ? 0.5 : 0.7)};
    `}
`;

export const StyledModalContent = styled(Flex)<{ variant: ModalProps['variant'] }>`
  background: ${({ theme }) => theme.colors.backgroundModal};
  box-sizing: border-box;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ theme, variant }) =>
    variant === 'dialog' &&
    css`
      ${theme.shadow.floating};

      max-width: ${theme.breakpointValues.tablet};
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
    `}

  ${({ theme, variant }) =>
    variant === 'modal' &&
    css`
      height: 100%;
      width: 100%;

      ${theme.breakpoints.tablet} {
        ${theme.shadow.floating};

        height: auto;
        left: 50%;
        max-height: 90vh;
        max-width: ${theme.breakpointValues.tablet};
        top: 50%;
        transform: translate(-50%, -50%);
      }

      ${theme.breakpoints.desktop} {
        max-height: 80vh;
      }
    `}
`;

export const StyledModalActions = styled(Flex)`
  padding: ${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => theme.spacing.xLarge};
  }
`;

export const StyledModalHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => theme.spacing.xLarge};
  }
`;

export const StyledModalClose = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xxSmall};
  right: ${({ theme }) => theme.spacing.xxSmall};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

export const StyledModalBody = styled.div`
  flex-grow: 1;
  padding: 0 ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.xLarge};
  }
`;

StyledModal.defaultProps = { theme: defaultTheme };
StyledModalActions.defaultProps = { theme: defaultTheme };
StyledModalBody.defaultProps = { theme: defaultTheme };
StyledModalClose.defaultProps = { theme: defaultTheme };
StyledModalContent.defaultProps = { theme: defaultTheme };
StyledModalHeader.defaultProps = { theme: defaultTheme };
