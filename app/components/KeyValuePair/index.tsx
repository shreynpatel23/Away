import React from "react";
import { IKeyValuePairProps } from "./interface";

export default function KeyValuePair({
  labelName,
  valueName,
  labelClassName,
  valueClassName,
  wrapperClassName,
  children,
}: IKeyValuePairProps) {
  return (
    <div className={wrapperClassName}>
      <p className={`text-xs leading-xs text-neutral-400 ${labelClassName}`}>
        {labelName}
      </p>
      {children ?? (
        <p className={`pt-1.5 ${valueClassName}`}>
          {!valueName || valueName === "" ? "NIL" : valueName}
        </p>
      )}
    </div>
  );
}
