import classNames from 'classnames';
import Downshift from 'downshift';
import machSorter from 'match-sorter';
import  React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';
import { ITextFieldProps } from './TextField';
import './TypeaheadField.css';

declare module 'match-sorter';

export interface IItem {
  value: string;
}

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
                ? machSorter(items.slice(), inputValue, { keys: ['value'] }).map(
                    (item: IItem, index: number) => (
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
                    )
                  )
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
