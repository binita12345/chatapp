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

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
// import { MenuPageModule } from '../pages/menu/menu';

@NgModule({
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeaderColor
  ]
  
})
export class AppModule {}
