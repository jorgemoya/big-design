import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { ellipsis } from 'polished';
import styled, { css } from 'styled-components';

import { withMargins } from '../../mixins';

import { HeadingProps, TextProps, TypographyProps } from './types';

const commonTextStyles = (props: TypographyProps) => css`
  color: ${({ theme }) => (props.color ? theme.colors[props.color] : theme.colors.copy)};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};

  ${props.ellipsis && ellipsis()};
`;

const textModifiers = (props: TextProps) => css`
  ${({ theme }) =>
    props.bold &&
    css`
      font-weight: ${theme.typography.fontWeight.semiBold};
    `}

  ${() =>
    props.italic &&
    css`
      font-style: italic;
    `}

  ${() =>
    props.underline &&
    css`
      text-decoration: underline;
    `}

  ${() =>
    props.strikethrough &&
    css`
      text-decoration: line-through;
    `}
`;

export const StyledH0 = styled.h1<HeadingProps>`
  ${props => commonTextStyles(props)};
  font-size: ${({ theme }) => theme.typography.fontSize.xxxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraLight};
  line-height: ${({ theme }) => theme.lineHeight.xxxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  ${withMargins()};
`;

export const StyledH1 = styled.h1<HeadingProps>`
  ${props => commonTextStyles(props)};
  font-size: ${({ theme }) => theme.typography.fontSize.xxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  line-height: ${({ theme }) => theme.lineHeight.xxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  ${withMargins()};
`;

export const StyledH2 = styled.h2<HeadingProps>`
  ${props => commonTextStyles(props)};
  font-size: ${({ theme }) => theme.typography.fontSize.xLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  ${withMargins()};
`;

export const StyledH3 = styled.h3<HeadingProps>`
  ${props => commonTextStyles(props)};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.large};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
  ${withMargins()};
`;

export const StyledH4 = styled.h4<HeadingProps>`
  ${props => commonTextStyles(props)};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xSmall};
  ${withMargins()};
`;

export const StyledText = styled.p<TextProps>`
  ${props => commonTextStyles(props)}
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  ${props => textModifiers(props)}

  &:last-child {
    margin-bottom: 0;
  }

  ${withMargins()};
`;

export const StyledSmall = styled.p<TextProps>`
  ${props => commonTextStyles(props)};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.secondary60)};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
  ${props => textModifiers(props)}

  &:last-child {
    margin-bottom: 0;
  }

  ${withMargins()};
`;

StyledH0.defaultProps = { theme: defaultTheme };
StyledH1.defaultProps = { theme: defaultTheme };
StyledH2.defaultProps = { theme: defaultTheme };
StyledH3.defaultProps = { theme: defaultTheme };
StyledH4.defaultProps = { theme: defaultTheme };
StyledText.defaultProps = { theme: defaultTheme };
StyledSmall.defaultProps = { theme: defaultTheme };
