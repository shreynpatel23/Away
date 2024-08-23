export interface IKeyValuePairProps {
  labelName: string;
  valueName?: string | number | undefined;
  children?: React.ReactElement;
  labelClassName?: string;
  valueClassName?: string;
  wrapperClassName?: string;
}
