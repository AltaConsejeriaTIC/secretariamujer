export class ErrorFactory {
  private constructor(){
  }

  static createError(errorName: string, errorMessage?: string): Error {
    let error = new Error(errorMessage);
    error.name = errorName;

    return error;
  }

  static fireError(errorName: string, errorMessage?: string) {
    throw this.createError(errorName, errorMessage);
  }
}
