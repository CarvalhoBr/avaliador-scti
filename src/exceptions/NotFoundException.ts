import ApiException from "./apiException";

export default class NotFoundException extends ApiException {
  isRetryable(): boolean {
    return false;
  }
  constructor(message: string) {
    super(message, 404);
  }
}