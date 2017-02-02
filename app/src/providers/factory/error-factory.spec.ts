import {ErrorFactory} from './error-factory';


describe('ErrorFactory tests', () => {
  let errorFactory: ErrorFactory = new ErrorFactory();

  it('createError should create a error with a fullName', () => {
    let error = errorFactory.createError('ErrorDummy');
    expect(error).toBeDefined();
    expect(error.name).toEqual('ErrorDummy');
  });

  it('fireError should fire a error with a given fullName and message', () => {
    expect(() => {
      errorFactory.fireError('ErrorDummy')
    }).toThrowError();
  });

});
