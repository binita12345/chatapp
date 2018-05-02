import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  configura(){
  	console.log("go to configura");
  	this.navCtrl.push("ConfiguraPage");
  }
  celulares(){
    console.log("go to CelularesPage");
    this.navCtrl.push("CelularesPage");
  }
  videos(){
    console.log("go to VideosPage");
    this.navCtrl.push("VideosPage");
  }
  preguntas(){
    console.log("go to PreguntasPage");
    this.navCtrl.push("PreguntasPage");
  }
  chat(){
    console.log("go to ChatPage");
    this.navCtrl.push("ChatPage");
  }


}
