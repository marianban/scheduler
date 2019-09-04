import classNames from 'classnames';
import Downshift from 'downshift';
import machSorter from 'match-sorter';
import React from 'react';
import { FieldContainer, IFieldContainerProps } from './FieldContainer';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';
import './TypeaheadField.css';

declare module 'match-sorter';

export interface IItem {
  value: string;
  key: string;
}

interface ITypeaheadFieldProps {
  items: IItem[];
  onSelected?: (value: IItem) => void;
}

export class TypeaheadField extends React.Component<
  ITextBoxProps & ITypeaheadFieldProps & IFieldContainerProps,
  {}
> {
  public render() {
    const {
      title,
      suffix,
      onSelected,
      items,
      isValid,
      message,
      ...rest
    } = this.props;
    return (
      <Downshift
        itemToString={this.itemToString}
        onSelect={this.handleOnMenuItemSelected}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div className="typeahead-field">
            <Label {...getLabelProps({ title })}>
              <FieldContainer isValid={isValid} message={message}>
                <TextBox
                  {...getInputProps({
                    ...rest
                  }) as any}
                  suffix={suffix}
                />
              </FieldContainer>
            </Label>
            {isOpen ? (
              <ul {...getMenuProps({ className: 'typeahead-field__menu' })}>
                {machSorter(items.slice(), inputValue, {
                  keys: ['value']
                }).map((item: IItem, index: number) => (
                  <li
                    {...getItemProps({
                      key: item.key,
                      index,
                      item,
                      className: classNames('typeahead-field__menu__item', {
                        'typeahead-field__menu__item--highlighted':
                          highlightedIndex === index,
                        'typeahead-field__menu__item--selected':
                          selectedItem === item
                      })
                    })}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }

  private itemToString = (item: IItem) => {
    return item ? item.value : '';
  };

  private handleOnMenuItemSelected = (item: IItem) => {
    const { onSelected } = this.props;
    if (onSelected) {
      onSelected(item);
    }
  };
}
