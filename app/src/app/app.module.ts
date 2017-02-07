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
import {RegisterOptionalInfoPage} from "../pages/register-optional-info/register-optional-info";
import {TestPage} from "../pages/test-page/test-page";
import {TestsService} from "../providers/tests-service";
import {MenuPage} from "../pages/menu/menu";
import {WelcomeTestPage} from "../pages/welcome-test/welcome-test";
import {SelectTestCategoryPage} from "../pages/select-test-category/select-test-category";
import {AttentionRoutesPage} from "../pages/attention-routes/attention-routes";
import {AttentionRoutesLocationPage} from "../pages/attention-routes-location/attention-routes-location";
import {RoutesDetailsPage} from "../pages/routes-details/routes-details";
import {ContactSelectionPage} from "../pages/contact-selection/contact-selection";
import {SelectTipsCategoryPage} from "../pages/select-tips-category/select-tips-category";
import {Storage} from '@ionic/storage';
import {TipsPage} from "../pages/tips-page/tips-page";
import {ContactAdapter} from "../providers/contact-adapter";
import {ErrorFactory} from "../providers/factory/error-factory";
import {ContactFactory} from "../providers/factory/contact-factory";
import {SettingsPage} from "../pages/settings-page/settings-page";
import {ApplicationConfig} from "../config";
import {SelectInfoCategoryPage} from "../pages/select-info-category/select-info-category";
import {SDMUInfoPage} from "../pages/sdmu-info-page/sdmu-info-page";
import {SOFIAInfoPage} from "../pages/sofia-info/sofia-info";
import {WarningMessageDAO} from "../providers/warning-message-dao";
import {AboutAppPage} from "../pages/about-app-page/about-app-page";
import {TutorialPage} from "../pages/tutorial-page/tutorial-page";
import {FormValidator} from "../providers/form-validator";
import {CalculatorPage} from "../pages/calculator/calculator";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RequiredInfoFormPage,
    RegisterOptionalInfoPage,
    MenuPage,
    WelcomeTestPage,
    SelectTestCategoryPage,
    TestPage,
    MapPage,
    AttentionRoutesPage,
    AttentionRoutesLocationPage,
    RoutesDetailsPage,
    ContactSelectionPage,
    SelectTipsCategoryPage,
    TipsPage,
    SettingsPage,
    SelectInfoCategoryPage,
    SDMUInfoPage,
    SOFIAInfoPage,
    AboutAppPage,
    TutorialPage,
    CalculatorPage

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
    RegisterOptionalInfoPage,
    MenuPage,
    WelcomeTestPage,
    SelectTestCategoryPage,
    TestPage,
    MapPage,
    AttentionRoutesPage,
    AttentionRoutesLocationPage,
    RoutesDetailsPage,
    ContactSelectionPage,
    SelectTipsCategoryPage,
    TipsPage,
    SettingsPage,
    SelectInfoCategoryPage,
    SDMUInfoPage,
    SOFIAInfoPage,
    AboutAppPage,
    TutorialPage,
    CalculatorPage
  ],
  providers: [UserDAO, AlertCreator, MapServices, EventsServices, TestsService,
    ContactAdapter, Storage, ErrorFactory, ContactFactory, ApplicationConfig, WarningMessageDAO,FormValidator,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }]
})

export class AppModule {
}
