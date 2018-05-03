import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

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

  nickname = 'Binita Doriwala';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  // configura(){
  // 	console.log("go to configura");
  // 	this.navCtrl.push("ConfiguraPage");
  // }
  // celulares(){
  //   console.log("go to CelularesPage");
  //   this.navCtrl.push("CelularesPage");
  // }
  // videos(){
  //   console.log("go to VideosPage");
  //   this.navCtrl.push("VideosPage");
  // }
  // preguntas(){
  //   console.log("go to PreguntasPage");
  //   this.navCtrl.push("PreguntasPage");
  // }
  // chat(){
  //   console.log("go to ChatPage");
  //   this.navCtrl.push("ChatPage");
  // }

  chatting(){
    console.log("go to chattingPage");
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push("ChatPage", { nickname: this.nickname });
  }

  traveladvice(){
    this.navCtrl.push("TraveladvicePage");
  }
  usefulinfo(){
    this.navCtrl.push("UsefulinfoPage");
  }

}
