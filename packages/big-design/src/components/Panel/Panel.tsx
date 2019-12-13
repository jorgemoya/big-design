import React, { memo } from 'react';

import { MarginProps } from '../../mixins';
import { excludePaddingProps } from '../../mixins/paddings/paddings';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { H2 } from '../Typography';

import { StyledPanel } from './styled';

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends React.HTMLAttributes<HTMLElement>, MarginProps {
  header?: string;
  action?: PanelAction;
}

export const RawPanel: React.FC<PanelProps> = memo(props => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, header, ...rest } = filteredProps;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex justifyContent="space-between" flexDirection="row">
        {header && <H2>{header}</H2>}
        {action && <Button {...action}>{action.text}</Button>}
      </Flex>
    );
  };

  return (
    <StyledPanel
      {...rest}
      backgroundColor="foreground"
      shadow="raised"
      padding={{ mobile: 'medium', tablet: 'xxLarge' }}
      borderRadius="none"
    >
      {renderHeader()}
      {children}
    </StyledPanel>
  );
});

export const Panel: React.FC<PanelProps> = ({ className, style, ...props }) => <RawPanel {...props} />;

Panel.displayName = 'Panel';
