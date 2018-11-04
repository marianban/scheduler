import classNames from 'classnames';
import Downshift from 'downshift';
import * as React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';
import { ITextFieldProps } from './TextField';
import './TypeaheadField.css';

export interface IItem {
  value: string;
}

export const compareClientsFactory = (inputValue: string | null) => (
  a: IItem,
  b: IItem
) => {
  if (inputValue) {
    if (
      a.value &&
      a.value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) &&
      (b.value &&
        !b.value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
    ) {
      return -1;
    }

    if (
      b.value &&
      b.value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) &&
      (a.value &&
        !a.value.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
    ) {
      return 1;
    }
  }

  if (a.value && b.value) {
    return a.value.localeCompare(b.value);
  }

  return 0;
};

interface ITypeaheadFieldProps {
  items: IItem[];
  onSelected?: (value: IItem) => void;
}

export class TypeaheadField extends React.Component<
  ITextBoxProps & ITextFieldProps & ITypeaheadFieldProps,
  {}
> {
  public render() {
    const { title, suffix, onSelected, items, ...rest } = this.props;
    return (
      <Downshift
        itemToString={this.itemToString}
        onChange={this.handleOnMenuItemSelected}
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
              <TextBox {...getInputProps({ ...rest })} suffix={suffix} />
            </Label>
            <ul {...getMenuProps({ className: 'typeahead-field__menu' })}>
              {isOpen
                ? items
                    .slice()
                    .sort(compareClientsFactory(inputValue))
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
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
                    ))
                : null}
            </ul>
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
