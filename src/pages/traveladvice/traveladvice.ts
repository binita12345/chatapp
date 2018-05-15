import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TraveladvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-traveladvice',
  templateUrl: 'traveladvice.html',
})
export class TraveladvicePage {

  advices: any;
  adviceArray : any = [];
  getdata : any;
  corpocustoTravel : boolean;
  travelAgencyTravel : boolean;
	// advices: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public storage: Storage) {
 //  	this.advices = [
	//     {image: "assets/imgs/Marqueta/12.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	//     {image: "assets/imgs/Marqueta/13.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	//     {image: "assets/imgs/Marqueta/14.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	//     {image: "assets/imgs/Marqueta/15.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"}
	// ];

    this.storage.get('rutdata').then((getdata) => {
      console.log('getdata ' +getdata);
      this.getdata = getdata;
    });

    this.getTravelAdviceData();

    this.storage.get("isLogin").then((resulst) => {
      console.log("results login status", resulst);
      if(resulst){
        this.corpocustoTravel = true;
        this.travelAgencyTravel = false;
      } else {
        this.corpocustoTravel = false;
        this.travelAgencyTravel = true;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TraveladvicePage');
  }

  goback(){
    // this.navCtrl.pop();
    // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // if(this.getdata == ''){
    //   this.navCtrl.push("NotlogedinPage");
    // } else {
      this.navCtrl.push("MenuPage");
    // }
    // this.navCtrl.push("MenuPage");
    // this.navCtrl.popToRoot();
    // this.navCtrl.canGoBack();
  }

  getTravelAdviceData() {
    this.restProvider.getTravelAdvice()
    .then(data => {
      let serviceData : any =  data['consejosviaje'];
      console.log("ts data", serviceData);
      // this.advices = data;
      // console.log(this.advices);
      // for(let advice of this.advices){
      //   console.log("for loop advice", advice);
      // }
      this.adviceArray = serviceData;
      // console.log(this.adviceArray);
    });
  }

}
