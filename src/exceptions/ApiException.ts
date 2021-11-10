export default abstract class ApiException extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }

  abstract isRetryable(): boolean;
}