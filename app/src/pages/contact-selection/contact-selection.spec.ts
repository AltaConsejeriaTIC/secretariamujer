import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule,
  AlertController, NavParams
}  from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigMock} from '../../mocks';
import {AlertCreator} from "../../providers/alert-creator";
import {ContactSelectionPage} from "./contact-selection";
import {ContactAdapter} from "../../providers/contact-adapter";
import {ContactFactory} from "../../providers/factory/contact-factory";
import {ErrorFactory} from "../../providers/factory/error-factory";
import {ContactDAO} from "../../providers/contact-dao";


describe('ContactSelection tests', () => {
  let contactSelectionPage: ContactSelectionPage;
  let fixture: ComponentFixture<ContactSelectionPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactSelectionPage],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, AlertCreator, AlertController, ContactAdapter,
        ContactFactory, ErrorFactory,
        {
          provide: Config,
          useClass: ConfigMock
        },
        {
          provide: NavParams,
          useClass: ConfigMock
        },
        {
          provide: ContactDAO,
          useClass: ConfigMock
        },

      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSelectionPage);
    contactSelectionPage = fixture.componentInstance;
  });

  it('selectContactFromDevice', () => {
  });

});

