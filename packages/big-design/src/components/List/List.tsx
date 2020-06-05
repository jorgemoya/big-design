import React, { forwardRef, HTMLAttributes, memo, Ref } from 'react';

import { StyledList } from './styled';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  maxHeight: number;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

const StyleableList: React.FC<ListProps & PrivateProps> = ({ forwardedRef, ...props }) => {
  return <StyledList ref={forwardedRef} {...props} />;
};

export const List = memo(
  forwardRef<HTMLUListElement, ListProps>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);
