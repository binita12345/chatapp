import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    // this.navCtrl.pop();
    this.navCtrl.push("MenuPage");
  }

}
