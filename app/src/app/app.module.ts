import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { UserDAO } from  '../providers/user-dao'
import { AlertCreator } from  '../providers/alert-creator'
import { MapServices } from  '../providers/map-services'
import {EventsServices} from "../providers/events-services";
import {HomePage} from "../pages/home/home";
import {RequiredInfoFormPage} from "../pages/required-info-form/required-info-form";
import {OptionalInfoFormPagePage} from "../pages/optional-info-form-page/optional-info-form-page";
import {TestPage} from "../pages/test-page/test-page";
import {TestsService} from "../providers/tests-service";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    OptionalInfoFormPagePage,
    TestPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText:''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    OptionalInfoFormPagePage,
    TestPage,
    MapPage
  ],
  providers: [UserDAO,AlertCreator, MapServices, EventsServices, TestsService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
