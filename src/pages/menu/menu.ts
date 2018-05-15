import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  toUser : {toUserId: string, toUserName: string};
  // corpocustoHeader : boolean;
  // travelAgencyHeader : boolean;
  corpocustoContent : boolean;
  travelAgencyContent : boolean;

  // nickname = 'Binita Doriwala';

  // constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private callNumber: CallNumber) {
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private storage: Storage) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
    this.storage.get("isLogin").then((resulst) => {
      console.log("results login status", resulst);
      if(resulst){
        // this.corpocustoHeader = true;
        // this.travelAgencyHeader = false;
        this.corpocustoContent = true;
        this.travelAgencyContent = false;
      } else {
        // this.corpocustoHeader = false;
        // this.travelAgencyHeader = true;
        this.corpocustoContent = false;
        this.travelAgencyContent = true;
      }
    });

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  chatting(){
    console.log("go to chattingPage");
    // this.socket.connect();
    // this.socket.emit('set-nickname', this.nickname);
    // this.navCtrl.push("ChatPage");
    // this.navCtrl.push("ChatPage", { nickname: this.nickname });

    this.navCtrl.push("ChatPage", { toUser: this.toUser });
  }

  traveladvice(){
    this.navCtrl.push("TraveladvicePage");
  }
  usefulinfo(){
    this.navCtrl.push("UsefulinfoPage");
  }
  phone(){
    this.callNumber.callNumber("8734814110", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

}
