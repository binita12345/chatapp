import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';

// import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
// import { MenuPageModule } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = MenuPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(private headerColor : HeaderColor, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { icon: 'ios-home', title: 'INICIO', component: ''},
      { icon: 'md-qr-scanner', title: 'CONFIGURA TU EQUIPO', component: 'ConfiguraPage'},
      { icon: 'ios-download-outline', title: 'TECNOLOGÍAS PARA CELULARES', component: 'CelularesPage'},
      { icon: 'ios-film', title: 'TUTORIALES EN VIDEO', component: 'VideosPage'},
      { icon: 'information-circle', title: 'PREGUNTAS FRECUENTES', component: 'PreguntasPage'},
      { icon: 'chatbubbles', title: 'CHAT DE SOPORTE', component: 'ChatPage'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.headerColor.tint('#FF5F00');
    });
  }

  openPage(page) {
    if(page.component){
      this.nav.setRoot(page.component);
    }
  }
}

