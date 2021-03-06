import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { MenuPage } from '../pages/menu/menu';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
import { PassportloginPageModule } from '../pages/passportlogin/passportlogin.module';
// import { NotlogedinPage } from '../pages/notlogedin/notlogedin';

import { HeaderComponent } from '../components/header/header';
import { HeaderComponentModule } from '../components/header/header.module';
import { FooterComponentModule } from '../components/footer/footer.module';
// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Loader } from '../providers/loader/loader';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';

// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
// const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // PassportloginPage,
    // NotlogedinPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false }),
    IonicStorageModule.forRoot(),
    HeaderComponentModule,
    FooterComponentModule,
    // SocketIoModule.forRoot(config),
    PassportloginPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PassportloginPage,
    // NotlogedinPage,
    HeaderComponent
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    CallNumber,
    Loader,
    RestProvider,
    Push,
    FCM
  ]
  
})
export class AppModule {}
