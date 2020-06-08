import { CheckIcon } from '@bigcommerce/big-design-icons';
import { useCombobox, UseComboboxState, UseComboboxStateChangeOptions } from 'downshift';
import React, {
  cloneElement,
  createRef,
  Fragment,
  isValidElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { FlexItem } from '../Flex/Item';
import { FormControlLabel } from '../Form';
import { Input } from '../Input';
import { List } from '../List';
import { ListGroupHeader } from '../List/GroupHeader';
import { ListItem } from '../List/Item';

import { DropdownButton, StyledDropdownIcon, StyledInputContainer } from './styled';
import { SelectAction, SelectOption, SelectOptionGroup, SelectProps } from './types';

export const Select = typedMemo(
  <T extends any>({
    action,
    className,
    disabled,
    filterable = true,
    inputRef,
    id,
    label,
    labelId,
    maxHeight = 250,
    onOptionChange,
    options,
    placeholder,
    placement = 'bottom-start' as 'bottom-start',
    positionFixed = false,
    required,
    style,
    value,
    ...rest
  }: SelectProps<T>): ReturnType<React.FC<SelectProps<T>>> => {
    const referenceElementRef = useRef<HTMLInputElement>(null);
    const popperElementRef = useRef<HTMLInputElement>(null);

    // Merge options and action
    const flattenedOptions = useMemo(() => (action ? [...flattenOptions(options), action] : flattenOptions(options)), [
      action,
      options,
    ]);

    const itemKey = useRef(0);

    const findSelectedOption = useMemo(() => {
      return flattenedOptions.find((option) => 'value' in option && option.value === value) as
        | SelectOption<T>
        | undefined;
    }, [flattenedOptions, value]);

    const [selectOptions, setSelectOptions] = useState(flattenedOptions);
    const [selectedOption, setSelectedOption] = useState(findSelectedOption);
    const [inputValue, setInputValue] = useState(selectedOption ? selectedOption.content : '');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const defaultRef: RefObject<HTMLInputElement> = createRef();
    const selectUniqueId = useUniqueId('select');

    // Need to set select options if options prop changes
    useEffect(() => setSelectOptions(flattenedOptions), [flattenedOptions]);

    useEffect(() => {
      // setSelectedOption(findSelectedOption);
      if (selectedOption && selectedOption.value !== value) {
        setSelectedOption(findSelectedOption);
      }
    }, [findSelectedOption, selectedOption, value]);

    // Set the input's value to match the selected item
    useEffect(() => {
      setInputValue(selectedOption ? selectedOption.content : '');
    }, [selectedOption]);

    const findSelectedOptionIndex = useMemo(() => {
      return selectOptions.findIndex((item) => 'value' in item && item.value === value);
    }, [selectOptions, value]);

    useEffect(() => {
      setHighlightedIndex(findSelectedOptionIndex);
    }, [findSelectedOptionIndex]);

    const handleSetInputValue = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === true) {
        setSelectOptions(filterOptions(changes.inputValue));
      }

      setInputValue(changes.inputValue || '');
    };

    const filterOptions = (inputVal = '') => {
      return flattenedOptions.filter(
        (option) =>
          option.content === (action && action.content) ||
          option.content.toLowerCase().startsWith(inputVal.trim().toLowerCase()),
      );
    };

    const handleOnHighlightedIndexChange = (
      changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>,
    ) => {
      if (typeof changes.highlightedIndex !== 'undefined') {
        setHighlightedIndex(changes.highlightedIndex);
      }
    };

    const handleOnIsOpenChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (filterable && changes.isOpen === false) {
        // Reset the items if filtered
        setSelectOptions(flattenedOptions);
      }
    };

    const handleOnSelectedItemChange = (changes: Partial<UseComboboxState<SelectOption<T> | SelectAction | null>>) => {
      if (action && changes.selectedItem && changes.selectedItem.content === action.content) {
        action.onActionClick(inputValue);
      } else if (changes.selectedItem && 'value' in changes.selectedItem && typeof onOptionChange === 'function') {
        setSelectedOption(changes.selectedItem);
        onOptionChange(changes.selectedItem.value, changes.selectedItem);
      }
    };

    const handleStateReducer = (
      state: UseComboboxState<SelectOption<T> | SelectAction | null>,
      actionAndChanges: UseComboboxStateChangeOptions<SelectOption<T> | SelectAction | null>,
    ) => {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...actionAndChanges.changes, inputValue: selectedOption ? selectedOption.content : '' };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (
            (actionAndChanges.changes.selectedItem && actionAndChanges.changes.selectedItem.content) ===
            (action && action.content)
          ) {
            return { ...actionAndChanges.changes, inputValue: state.inputValue };
          }

          return actionAndChanges.changes;
        default:
          return actionAndChanges.changes;
      }
    };

    const {
      closeMenu,
      getComboboxProps,
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      openMenu,
    } = useCombobox<SelectOption<T> | SelectAction | null>({
      highlightedIndex,
      id: selectUniqueId,
      inputId: id,
      inputValue,
      itemToString: (option) => (option ? option.content : ''),
      items: selectOptions,
      labelId,
      onHighlightedIndexChange: handleOnHighlightedIndexChange,
      onInputValueChange: handleSetInputValue,
      onIsOpenChange: handleOnIsOpenChange,
      onSelectedItemChange: handleOnSelectedItemChange,
      selectedItem: selectedOption || null,
      stateReducer: handleStateReducer,
    });

    const { styles, attributes, update } = usePopper(referenceElementRef.current, popperElementRef.current, {
      modifiers: [
        { name: 'eventListeners', options: { scroll: isOpen, resize: isOpen } },
        { name: 'offset', options: { offset: [0, 10] } },
      ],
      placement,
      strategy: positionFixed ? 'fixed' : 'absolute',
    });

    const renderLabel = useMemo(() => {
      return typeof label === 'string' ? (
        <FormControlLabel {...getLabelProps()} renderOptional={!required}>
          {label}
        </FormControlLabel>
      ) : null;
    }, [getLabelProps, label, required]);

    const renderToggle = useMemo(() => {
      return (
        <DropdownButton
          {...getToggleButtonProps({
            disabled,
            type: 'button',
          })}
          aria-label="toggle menu"
          variant="subtle"
        >
          <StyledDropdownIcon />
        </DropdownButton>
      );
    }, [disabled, getToggleButtonProps]);

    const setCallbackRef = useCallback(
      (ref: HTMLInputElement) => {
        if (typeof inputRef === 'function') {
          inputRef(ref);
        }
      },
      [inputRef],
    );

    const getInputRef = useCallback(() => {
      if (inputRef && typeof inputRef === 'object') {
        return inputRef;
      } else if (typeof inputRef === 'function') {
        return setCallbackRef;
      }

      return defaultRef;
    }, [defaultRef, inputRef, setCallbackRef]);

    const renderInput = useMemo(() => {
      return (
        <StyledInputContainer ref={referenceElementRef}>
          <Input
            {...rest}
            {...getInputProps({
              autoComplete: 'no',
              disabled,
              onFocus: openMenu,
              onKeyDown: (event) => {
                switch (event.key) {
                  case 'Enter':
                    event.preventDefault();
                    if (isOpen === false) {
                      openMenu();
                      (event.nativeEvent as any).preventDownshiftDefault = true;
                    }
                    break;
                  case 'Escape':
                    if (isOpen === false) {
                      // reset select
                      onOptionChange();
                      setHighlightedIndex(-1);
                    } else {
                      closeMenu();
                    }
                    (event.nativeEvent as any).preventDownshiftDefault = true;
                    break;
                }
              },
              placeholder,
              ref: getInputRef(),
            })}
            iconRight={renderToggle}
            readOnly={!filterable}
            required={required}
          />
        </StyledInputContainer>
      );
    }, [
      closeMenu,
      disabled,
      filterable,
      getInputProps,
      getInputRef,
      isOpen,
      onOptionChange,
      openMenu,
      placeholder,
      renderToggle,
      required,
      rest,
    ]);

    const renderAction = useCallback(
      (actionItem: SelectAction) => {
        const index = selectOptions.length - 1;
        const isHighlighted = highlightedIndex === index;
        const { disabled: itemDisabled, content, icon, onActionClick, ...itemProps } = actionItem;

        return (
          <Box borderTop="box" marginTop="xSmall" paddingTop="xSmall" key={`${content}-${index}`}>
            <ListItem
              {...itemProps}
              {...getItemProps({
                disabled: itemDisabled,
                index,
                item: actionItem,
              })}
              isAction={true}
              isHighlighted={isHighlighted}
            >
              {getContent(actionItem, isHighlighted)}
            </ListItem>
          </Box>
        );
      },
      [getItemProps, highlightedIndex, selectOptions.length],
    );

    const renderOptions = useCallback(
      (items: Array<SelectOption<T>>) => {
        return items.map((item) => {
          if (
            !selectOptions.find(
              (option: SelectOption<T> | SelectAction) => 'value' in option && option.value === item.value,
            )
          ) {
            return null;
          }
          const key = itemKey.current;

          itemKey.current += 1;

          const isHighlighted = highlightedIndex === key;
          const isSelected = selectedOption ? 'value' in item && selectedOption.value === item.value : false;

          const { disabled: itemDisabled, content, icon, ...itemProps } = item;

          return (
            <ListItem
              {...itemProps}
              {...getItemProps({
                disabled: itemDisabled,
                index: key,
                item,
              })}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
              key={`${content}-${key}`}
            >
              {getContent(item, isHighlighted)}
              {isSelected && <CheckIcon color="primary" size="large" />}
            </ListItem>
          );
        });
      },
      [getItemProps, highlightedIndex, selectedOption, selectOptions],
    );

    const renderGroup = useCallback(
      (group: SelectOptionGroup<T>) => {
        return (
          <>
            <ListGroupHeader>{group.label}</ListGroupHeader>
            {renderOptions(group.options)}
          </>
        );
      },
      [renderOptions],
    );

    const renderChildren = useMemo(() => {
      itemKey.current = 0;

      if (Array.isArray(options) && options.every(isGroup)) {
        return (
          <>
            {(options as Array<SelectOptionGroup<T>>).map((group, index) => (
              <Fragment key={index}>{renderGroup(group)}</Fragment>
            ))}
            {action && renderAction(action)}
          </>
        );
      }

      if (
        Array.isArray(options) &&
        options.every((item: SelectOption<T> | SelectOptionGroup<T>) => {
          return 'value' in item && !('options' in item);
        })
      ) {
        return (
          <>
            {renderOptions(options as Array<SelectOption<T>>)}
            {action && renderAction(action)}
          </>
        );
      }
    }, [action, options, renderAction, renderGroup, renderOptions]);

    const renderList = useMemo(() => {
      return (
        <List
          {...getMenuProps({ ref: popperElementRef })}
          isOpen={isOpen}
          maxHeight={maxHeight}
          style={styles.popper}
          update={update}
          {...attributes.popper}
        >
          {isOpen && renderChildren}
        </List>
      );
    }, [attributes.popper, getMenuProps, isOpen, maxHeight, renderChildren, styles.popper, update]);

    return (
      <div>
        {renderLabel}
        <div {...getComboboxProps()}>{renderInput}</div>
        {renderList}
      </div>
    );
  },
);

const flattenOptions = <T extends any>(
  items: Array<SelectOption<T> | SelectOptionGroup<T>>,
): Array<SelectOption<T>> => {
  return items.every(isGroup)
    ? (items as Array<SelectOptionGroup<T>>)
        .map((group: SelectOptionGroup<T>) => group.options)
        .reduce((acc, curr) => acc.concat(curr), [])
    : (items as Array<SelectOption<T>>);
};

const isGroup = <T extends any>(item: SelectOption<T> | SelectOptionGroup<T>) => {
  return 'options' in item && !('value' in item);
};

const getContent = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  const { icon } = item;

  return (
    <Flex alignItems="center" flexDirection="row">
      {icon && <FlexItem paddingRight="xSmall">{renderIcon(item, isHighlighted)}</FlexItem>}
      {item.content}
    </Flex>
  );
};

const renderIcon = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  return (
    isValidElement(item.icon) &&
    cloneElement(item.icon, {
      color: iconColor(item, isHighlighted),
      size: 'large',
    })
  );
};

const iconColor = <T extends any>(item: SelectOption<T> | SelectAction, isHighlighted: boolean) => {
  if (item.disabled) {
    return 'secondary40';
  }

  if (!isHighlighted || !('onActionClick' in item)) {
    return 'secondary60';
  }

  return 'actionType' in item ? (item.actionType === 'destructive' ? 'danger50' : 'primary') : 'primary';
};
