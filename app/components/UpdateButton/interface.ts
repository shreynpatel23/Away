export interface IUpdateButtonProps {
    buttonText: string;
    buttonClassName: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hasIcon?: boolean;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    isLoading?: boolean;
  }