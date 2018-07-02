import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
// import { Push, PushToken } from '@ionic/cloud-angular';
import { FCM } from '@ionic-native/fcm';


// import { HomePage } from '../pages/home/home';
import { PassportloginPage } from '../pages/passportlogin/passportlogin';
// import { NotlogedinPage } from '../pages/notlogedin/notlogedin';
// import { MenuPageModule } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;
  rootPage:any = PassportloginPage;
  // rootPage:any = NotlogedinPage;
  appId: any = 23982933;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private keyboard: Keyboard, public menu: MenuController, private push: Push, public fcm: FCM) {
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
      // this.keyboard.disableScroll(true);
      this.keyboard.onKeyboardShow().subscribe(() => {
          document.body.classList.add('keyboard-is-open');
      });

      this.keyboard.onKeyboardHide().subscribe(() => {
          document.body.classList.remove('keyboard-is-open');
      });

      this.fcm.getToken().then(token => {
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this 
        // specific user you can do it from Cloud Functions.
        console.log('fcm get token', token);
      });

      this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        console.log('wasTapped', JSON.stringify(data));
        // this.navCtrl.setRoot('DetailPage', { profileId: data.profileId });
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        console.log('wasTapped foreground', JSON.stringify(data));
        // this.navCtrl.push('DetailPage', { profileId: data.profileId });
      }
    });

      // this.push.hasPermission()
      //   .then((res: any) => {

      //     if (res.isEnabled) {
      //       console.log('We have permission to send push notifications');
      //     } else {
      //       console.log('We do not have permission to send push notifications');
      //     }

      //   });

      // this.push.createChannel({
      //    id: "testchannel1",
      //    description: "My first test channel",
      //    // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      //    importance: 3
      //   }).then(() => console.log('Channel created'));

      //   // Delete a channel (Android O and above)
      //   this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

      //   // Return a list of currently configured channels
      //   this.push.listChannels().then((channels) => console.log('List of channels', channels))

        // to initialize push notifications

        // const options: PushOptions = {
        //   android: {
        //     senderID: "508790684170",
        //     clearNotifications: false
        //   },
        //   ios: {
        //        alert: 'true',
        //        badge: true,
        //        sound: 'false'
        //    },
        //    windows: {},
        //    browser: {
        //        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        //    }
        // };

        // const pushObject: PushObject = this.push.init(options);


        // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
              
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

