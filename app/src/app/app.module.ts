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
import {SelectTestCategoryPage} from "../pages/select-test-category/select-test-category";
import {SelectCategoryService} from "../providers/select-category-service";
import {AttentionRoutesPage} from "../pages/attention-routes/attention-routes";
import {AttentionRoutesLocationPage} from "../pages/attention-routes-location/attention-routes-location";
import {RoutesDetailsPage} from "../pages/routes-details/routes-details";
import {ContactPage} from "../pages/contact/contact";
import {SelectTipsCategoryPage} from "../pages/select-tips-category/select-tips-category";
import {ContactDAO} from "../providers/contact-dao";
import {Storage} from '@ionic/storage';
import {TipsPage} from "../pages/tips-page/tips-page";
import {ContactAdapter} from "../providers/contact-adapter";
import {ErrorFactory} from "../providers/error-factory";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    OptionalInfoFormPagePage,
    MenuPage,
    WelcomeTestPage,
    SelectTestCategoryPage,
    TestPage,
    MapPage,
    AttentionRoutesPage,
    AttentionRoutesLocationPage,
    RoutesDetailsPage,
    ContactPage,
    SelectTipsCategoryPage,
    TipsPage

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
    SelectTestCategoryPage,
    TestPage,
    MapPage,
    AttentionRoutesPage,
    AttentionRoutesLocationPage,
    RoutesDetailsPage,
    ContactPage,
    SelectTipsCategoryPage,
    TipsPage
  ],
  providers: [UserDAO, AlertCreator, MapServices, EventsServices, TestsService, SelectCategoryService, ContactDAO,
    ContactAdapter, Storage, ErrorFactory,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }]
})
export class AppModule {
}
