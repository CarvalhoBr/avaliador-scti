export default class ConsumerException{
  isRetryable(): boolean {
    return true
  }

  constructor(public message: string) {
  }
}