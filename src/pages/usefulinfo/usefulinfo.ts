import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UsefulinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usefulinfo',
  templateUrl: 'usefulinfo.html',
})
export class UsefulinfoPage {
	// countries : any;
	options = [];
	currency : any;
	capitalcity : any;
	idiom : any;
	numone : any;
	numtwo : any;
	numthree : any;
	address : any;
	emailadd : any;
  getdata : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('rutdata').then((getdata) => {
      console.log('getdata ' +getdata);
      this.getdata = getdata;
    });

  	this.options =  [
      {
        "name": "India",
      }
    ];
    // this.currency = "currency"
    // this.capitalcity = "Capital City"
    // this.idiom = "Idiom"

    // this.numone = "Phone Number 01"
    // this.numtwo = "Phone Number 02"
    // this.numthree = "Phone Number 03"
    // this.address = "Address"
    // this.emailadd = "Email Address 01"
    this.currency = ""
    this.capitalcity = ""
    this.idiom = ""

    this.numone = ""
    this.numtwo = ""
    this.numthree = ""
    this.address = ""
    this.emailadd = ""
	}

 //  optionsFn() {
	//   console.log(this.countries);
	//   let item = this.countries;
	// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsefulinfoPage');
  }
  goback(){

    if(this.getdata == ''){
      this.navCtrl.push("NotlogedinPage");
    } else {
      this.navCtrl.push("MenuPage");
    }
    // this.navCtrl.pop();
    // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.push("MenuPage");
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popToRoot();
    // this.navCtrl.canGoBack();
  }

}
