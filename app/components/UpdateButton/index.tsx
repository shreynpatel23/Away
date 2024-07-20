import React from "react";
import { IUpdateButtonProps } from "./interface";

export default function Button(props: IUpdateButtonProps) {
  const {
    buttonText,
    buttonClassName,
    hasIcon,
    icon,
    isDisabled,
    isLoading,
    onClick,
  } = props;
  return (
    <button
      type="button"
      className={`font-workSans font-medium flex items-center gap-4 px-6 py-2 transition-all ${buttonClassName} ${
        isLoading ? "bg-transparent" : ""
      }`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <p className="text-accent font-bold text-base">Loading...</p>
      ) : (
        <>
          {hasIcon && <>{icon}</>}
          {buttonText}
        </>
      )}
    </button>
  );
}