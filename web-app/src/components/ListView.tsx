import classNames from 'classnames';
import React from 'react';
import './ListView.css';

interface IListViewProps {
  children: React.ReactNode;
}

export const ListView = ({ children }: IListViewProps) => (
  <div className="list-view">{children}</div>
);

interface IListViewItemProps {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const ListViewItem = ({
  children,
  isSelected = false
}: IListViewItemProps) => (
  <div
    className={classNames('list-view__item', {
      'list-view__item--selected': isSelected
    })}
    data-testid={isSelected && 'selected-list-item'}
  >
    {children}
  </div>
);
