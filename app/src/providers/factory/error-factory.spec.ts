import {ErrorFactory} from './error-factory';


describe('ErrorFactory tests', () => {

  it('createError should create a error with a fullName', () => {
    let error = ErrorFactory.createError('ErrorDummy');
    expect(error).toBeDefined();
    expect(error.name).toEqual('ErrorDummy');
  });

  it('fireError should fire a error with a given fullName and message', () => {
    expect(() => {
      ErrorFactory.fireError('ErrorDummy')
    }).toThrowError();
  });

});
