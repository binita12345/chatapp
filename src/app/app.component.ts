import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

// import { HomePage } from '../pages/home/home';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
// import { NotlogedinPage } from '../pages/notlogedin/notlogedin';
// import { MenuPageModule } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = PassportloginPage;
  // rootPage:any = NotlogedinPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private keyboard: Keyboard, public menu: MenuController) {
    this.initializeApp();

    this.pages = [
      { icon: 'ios-arrow-forward', title: 'Solicita tu viaje', component: 'ChatPage'},
      { icon: 'ios-arrow-forward', title: 'Consejos para tu viaje', component: 'TraveladvicePage'},
      { icon: 'ios-arrow-forward', title: 'Datos Utiles', component: 'UsefulinfoPage'},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.show();

      // this.statusBar.styleDefault();

      this.keyboard.onKeyboardShow().subscribe(() => {
          document.body.classList.add('keyboard-is-open');
      });

      this.keyboard.onKeyboardHide().subscribe(() => {
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
  }

  openPage(page) {
    this.menu.close();
    if(page.component){
      this.nav.setRoot(page.component);
    }
  }
}

