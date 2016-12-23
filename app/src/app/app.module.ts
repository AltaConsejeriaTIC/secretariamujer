import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { UserDAO } from  '../providers/user-dao'
import { AlertCreator } from  '../providers/alert-creator'
import { MapServices } from  '../providers/map-services'



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage
  ],
  providers: [UserDAO,AlertCreator, MapServices, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
