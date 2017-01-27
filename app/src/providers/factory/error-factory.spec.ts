import {ErrorFactory} from './error-factory';


describe('ErrorFactory tests', () => {
  let errorFactory: ErrorFactory = new ErrorFactory();

  it('createError should create a error with a name', () => {
    let error = errorFactory.createError('ErrorDummy');
    expect(error).toBeDefined();
    expect(error.name).toEqual('ErrorDummy');
  });

  it('fireError should fire a error with a given name and message', () => {
    expect(() => {
      errorFactory.fireError('ErrorDummy')
    }).toThrowError();
  });

});
