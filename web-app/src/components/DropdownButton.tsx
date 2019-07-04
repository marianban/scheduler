import React, { useState } from 'react';

interface IProps {
  text: JSX.Element;
  children: JSX.Element;
}

export const DropDownButton = ({
  text,
  children
}: IProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [show, setShow] = useState(false);
  return (
    <div className="dropdown" onClick={() => setShow(!show)}>
      {text}
      {show && <ul className="dropdown__menu">{children}</ul>}
    </div>
  );
};

interface IItemProps {
  children: JSX.Element;
}

DropDownButton.Item = ({
  onClick,
  children
}: IItemProps & React.HTMLAttributes<HTMLLIElement>) => (
  <li onClick={onClick}>{children}</li>
);
