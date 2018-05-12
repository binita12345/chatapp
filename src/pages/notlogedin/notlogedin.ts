import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the NotlogedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notlogedin',
  templateUrl: 'notlogedin.html',
})
export class NotlogedinPage {

	toUser : {toUserId: string, toUserName: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotlogedinPage');
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
