export interface IFillCalendarFormProps {
  onPopulate: ({
    fillPercentage,
    startDate,
    endDate,
  }: {
    fillPercentage: number;
    startDate: string;
    endDate: string;
  }) => void;
  onConfirm: () => void;
  onReFill: () => void;
  onCancel: () => void;
  areEventsPopulated: boolean;
  state: {
    fillPercentage: number;
    startDate: string;
    endDate: string;
  };
  setState: (value: any) => void;
}
