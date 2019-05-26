import classNames from "classnames";
import React from "react";
import "./ListView.css";

interface IListViewProps {
  children: React.ReactNode;
}

export const ListView = ({ children }: IListViewProps) => (
  <div className="list-view" data-testid="list-view">
    {children}
  </div>
);

interface IListViewItemProps {
  children: React.ReactNode;
  isSelected?: boolean;
  id: string;
  onClick: (id: string) => void;
}

export const ListViewItem = ({
  children,
  id = "",
  isSelected = false,
  onClick
}: IListViewItemProps) => (
  <div
    className={classNames("list-view__item", {
      "list-view__item--selected": isSelected
    })}
    data-testid={isSelected ? "selected-list-item" : `list-item-${id}`}
    onClick={onClick.bind(null, id)}
  >
    {children}
  </div>
);
