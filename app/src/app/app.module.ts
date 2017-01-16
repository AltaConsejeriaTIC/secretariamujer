import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {MapPage} from '../pages/map/map';
import {UserDAO} from  '../providers/user-dao'
import {AlertCreator} from  '../providers/alert-creator'
import {MapServices} from  '../providers/map-services'
import {EventsServices} from "../providers/events-services";
import {HomePage} from "../pages/home/home";
import {RequiredInfoFormPage} from "../pages/required-info-form/required-info-form";
import {OptionalInfoFormPagePage} from "../pages/optional-info-form-page/optional-info-form-page";
import {TestPage} from "../pages/test-page/test-page";
import {TestsService} from "../providers/tests-service";
import {MenuPage} from "../pages/menu/menu";
import {WelcomeTestPage} from "../pages/welcome-test/welcome-test";
import {SelectCategoryPage} from "../pages/select-category/select-category";
import {SelectCategoryService} from "../providers/select-category-service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    OptionalInfoFormPagePage,
    MenuPage,
    WelcomeTestPage,
    SelectCategoryPage,
    TestPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'md-arrow-dropleft'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    OptionalInfoFormPagePage,
    MenuPage,
    WelcomeTestPage,
    SelectCategoryPage,
    TestPage,
    MapPage
  ],
  providers: [UserDAO, AlertCreator, MapServices, EventsServices, TestsService, SelectCategoryService, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  }]
})
export class AppModule {
}
