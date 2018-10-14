import classNames from 'classnames';
import Downshift from 'downshift';
import * as React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';
import { ITextFieldProps } from './TextField';
import './TypeaheadField.css';

const items = [
  { value: 'Marian Ban' },
  { value: 'Annamaria Banova' },
  { value: 'Leonard Ban' }
];

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
      a.value.includes(inputValue) &&
      (b.value && !b.value.includes(inputValue))
    ) {
      return -1;
    }

    if (
      b.value &&
      b.value.includes(inputValue) &&
      (a.value && !a.value.includes(inputValue))
    ) {
      return 1;
    }
  }

  if (a.value && b.value) {
    return a.value.localeCompare(b.value);
  }

  return 0;
};

export class TypeaheadField extends React.Component<
  ITextBoxProps & ITextFieldProps,
  {}
> {
  public render() {
    const { title } = this.props;
    return (
      <Downshift itemToString={this.itemToString}>
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
              <TextBox {...getInputProps()} />
            </Label>
            <ul {...getMenuProps({ className: 'typeahead-field__menu' })}>
              {isOpen
                ? items
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

  private itemToString = (item: any) => {
    return item ? item.value : '';
  };
}
