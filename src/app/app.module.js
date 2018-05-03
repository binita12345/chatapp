var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { MenuPage } from '../pages/menu/menu';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
import { HeaderComponent } from '../components/header/header';
import { HeaderComponentModule } from '../components/header/header.module';
import { SocketIoModule } from 'ng-socket-io';
var config = { url: 'http://localhost:3001', options: {} };
// import { MenuPageModule } from '../pages/menu/menu';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                PassportloginPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                HeaderComponentModule,
                SocketIoModule.forRoot(config)
                // PassportloginPageModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                PassportloginPage,
                HeaderComponent
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                HeaderColor
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map