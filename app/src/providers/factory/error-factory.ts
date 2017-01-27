import {Injectable} from '@angular/core';

@Injectable()
export class ErrorFactory {

  constructor() {
  }

  createError(errorName: string, errorMessage?: string): Error {
    let error = new Error(errorMessage);
    error.name = errorName;

    return error;
  }

  fireError(errorName: string, errorMessage?: string) {
    throw this.createError(errorName, errorMessage);
  }
}
