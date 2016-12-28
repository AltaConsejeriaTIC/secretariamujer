import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { UserDAO } from  '../providers/user-dao'
import { AlertCreator } from  '../providers/alert-creator'
import { MapServices } from  '../providers/map-services'
import {EventsServices} from "../providers/events-services";
import {RequiredInfoFormPage} from "../pages/required-info-form/required-info-form";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    MapPage
  ],
  providers: [UserDAO,AlertCreator, MapServices, EventsServices, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
