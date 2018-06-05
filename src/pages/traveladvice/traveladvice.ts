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
  getcompanyLogo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public storage: Storage) {
    this.storage.get('rutdata').then((getdata) => {
      console.log('getdata ' +getdata);
      this.getdata = getdata;
    });
    this.storage.get('companyLogo').then((getcompanyLogo) => {
      console.log('getcompanyLogo',getcompanyLogo);
      this.getcompanyLogo = getcompanyLogo;
      console.log('this.getcompanyLogo',this.getcompanyLogo);
    });
    this.getTravelAdviceData();

    this.storage.get("isLogin").then((resulst) => {
      console.log("results travel advice status", resulst);
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
      this.navCtrl.push("MenuPage");
  }

  getTravelAdviceData() {
    this.restProvider.getTravelAdvice()
    .then(data => {
      let serviceData : any =  data['consejosviaje'];
      this.adviceArray = serviceData;
    });
  }

}
