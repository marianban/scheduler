import classNames from "classnames";
import { ReactComponent as TriagleIcon } from "icons/exclamation-triangle-solid.svg";
import React from "react";
import "./FieldContainer.css";

export interface IFieldContainerProps {
  isValid?: boolean;
  message?: string;
}

export const FieldContainer = ({
  children,
  isValid = true,
  message = ""
}: IFieldContainerProps & { children: React.ReactNode }) => (
  <div className={classNames("field-container", { "invalid-field": !isValid })}>
    {children}
    {!isValid && (
      <div className="field-container__message" role="alert">
        <TriagleIcon height="10" /> {message}
      </div>
    )}
  </div>
);
