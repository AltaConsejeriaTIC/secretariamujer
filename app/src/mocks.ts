import {Observable} from "rxjs";
import {User, IUser} from "./entity/user";
import {Response, ResponseOptions} from "@angular/http";
import {IContact} from "./entity/contact";

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class LoadingControllerMock {
  public create(): any {
    return {
      present: () => {
      }
    }
  }

  public present(): any {
    return ''
  }

  public dismiss(): any {
    return ''
  }

}

export class LoadingMock {
  public create(): any {
    return ''
  }

  public present(): any {
    return ''
  }

  public dismiss(): any {
    return ''
  }

}

export class UserDAOMock {
  user = {contacts: new Array<IContact>(3)};

  create = jasmine.createSpy('create').and.callFake(
    () => {
      let r = new Response(new ResponseOptions());
      return Observable.of(r);
    });

  setOptionalInfo = jasmine.createSpy('create').and.callFake(
    () => {
      return Observable.of(new User('usuariofalso'));
    });
}


export class AlertCreatorMock {
  showSimpleAlert() {
  }

  showCofirmationMessage() {
  }
}
