/* export class ActionResponse {
  constructor(
    public success: boolean,
    public errorMsg?: string,
    public data?: any,
    public message?: string,
  ) {}
} */

export interface IActionResponse<T> {
  success: boolean;
  errorMsg?: string;
  data?: T;
  message?: string;
  dev?: any;
}

export default function ActionResponse<T>({
  success,
  errorMsg,
  data,
  message,
  dev,
}: IActionResponse<T>) {
  return {
    success,
    errorMsg,
    data,
    message,
    dev,
  };
}
