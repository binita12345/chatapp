var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
// import { HomePage } from '../pages/home/home';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
// import { NotlogedinPage } from '../pages/notlogedin/notlogedin';
// import { MenuPageModule } from '../pages/menu/menu';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard, menu) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.keyboard = keyboard;
        this.menu = menu;
        this.rootPage = PassportloginPage;
        this.initializeApp();
        this.pages = [
            { icon: 'ios-arrow-forward', title: 'Solicita tu viaje', component: 'ChatPage' },
            { icon: 'ios-arrow-forward', title: 'Consejos para tu viaje', component: 'TraveladvicePage' },
            { icon: 'ios-arrow-forward', title: 'Datos Utiles', component: 'UsefulinfoPage' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.statusBar.show();
            // this.statusBar.styleDefault();
            // this.keyboard.disableScroll(true);
            _this.keyboard.onKeyboardShow().subscribe(function () {
                document.body.classList.add('keyboard-is-open');
            });
            _this.keyboard.onKeyboardHide().subscribe(function () {
                document.body.classList.remove('keyboard-is-open');
            });
            // this.statusBar.overlaysWebView(false); 
        });
        // if (this.platform.is('ios')) {
        //   // This will only print when on iOS
        //   console.log('I am an iOS device!');
        //   this.statusBar.overlaysWebView(false);
        // } else if (this.platform.is('android')) {
        //   this.statusBar.overlaysWebView(true);
        //     console.log('I am an android device!');
        // }
    };
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        if (page.component) {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Keyboard, MenuController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map