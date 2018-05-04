import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
// import { MenuPageModule } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = PassportloginPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { icon: 'wifi', title: 'WiFi', component: ''},
      { icon: 'md-bluetooth', title: 'Bluetooth', component: ''},
      { icon: 'md-log-out', title: 'Log Out', component: ''},
      // { icon: 'ios-home', title: 'INICIO', component: ''},
      // { icon: 'md-qr-scanner', title: 'CONFIGURA TU EQUIPO', component: 'ConfiguraPage'},
      // { icon: 'ios-download-outline', title: 'TECNOLOGÍAS PARA CELULARES', component: 'CelularesPage'},
      // { icon: 'ios-film', title: 'TUTORIALES EN VIDEO', component: 'VideosPage'},
      // { icon: 'information-circle', title: 'PREGUNTAS FRECUENTES', component: 'PreguntasPage'},
      // { icon: 'chatbubbles', title: 'CHAT DE SOPORTE', component: 'ChatPage'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
    if(page.component){
      this.nav.setRoot(page.component);
    }
  }
}

