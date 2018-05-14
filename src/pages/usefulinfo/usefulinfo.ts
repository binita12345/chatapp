import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
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
	// countries : any = [];

  countries: string[];
  errorMessage: string;

	// country : any;;
	currency : any;
	capitalcity : any;
	idiom : any;
	numone : any;
	numtwo : any;
	numthree : any;
	address : any;
	emailadd : any;
  appID : any;

  corpocustoInfo : boolean;
  travelAgencyInfo : boolean;

  // countryArray : any;
  country: any;
  error : any = '';
  infoarray : any =[];
  informations : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public restProvider: RestProvider) {



    // this.getuserInfoData();

    this.storage.get("isLogin").then((resulst) => {
      console.log("results login status", resulst);
      if(resulst){
        this.corpocustoInfo = true;
        this.travelAgencyInfo = false;
        this.storage.get('appId').then((appID) => {
          console.log('appID ' +appID);
          this.appID = appID;
          this.restProvider.getuserInfo(this.appID)
            .then(data => {
              this.infoarray =  data;
              console.log("ts user data", this.infoarray['datosutiles']);
              this.informations = this.infoarray['datosutiles'];
              console.log("this.informations", this.informations);
              // console.log("moneda", serviceData.)
              // this.advices = data;
              // console.log(this.advices);
              // for(let advice of this.advices){
              //   console.log("for loop advice", advice);
              // }
              // this.adviceArray = serviceData;
              // console.log(this.adviceArray);
            });
        });
      } else {
        this.corpocustoInfo = false;
        this.travelAgencyInfo = true;
      }
    });
    // this.currency = "currency"
    // this.capitalcity = "Capital City"
    // this.idiom = "Idiom"

    // this.numone = "Phone Number 01"
    // this.numtwo = "Phone Number 02"
    // this.numthree = "Phone Number 03"
    // this.address = "Address"
    // this.emailadd = "Email Address 01"
    
	}

  // getuserInfoData() {
  //   this.restProvider.getuserInfo(this.appID)
  //   .then(data => {
  //     let serviceData : any =  data;
  //     console.log("ts user data", serviceData);
  //     // this.advices = data;
  //     // console.log(this.advices);
  //     // for(let advice of this.advices){
  //     //   console.log("for loop advice", advice);
  //     // }
  //     // this.adviceArray = serviceData;
  //     // console.log(this.adviceArray);
  //   });
  // }

  onCountryChange(country){
    // this.restProvider.getCountries()
    //    .subscribe(data => {
    //      console.log("get countries api", data);
    //      this.countries = data;
    //    });
    // console.log("country ", country);
    // this.country = null;
    console.log("country ", country);
    this.restProvider.getCountries()
      .subscribe(countries => {
      // console.log("get countries from api", countries);

        this.countries = countries;
        for (var i = 0; i < this.countries.length; i++)
        {
          // console.log("this.countries[i]", this.countries[i]['name']);
          if (this.countries[i]['name'] == country) {
            this.country = this.countries[i]['name'];
          }
        }
      },
      (error) =>  {
        console.log("get country err", error);
        // this.errorMessage = <any>error
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsefulinfoPage');
    this.onCountryChange(this.country);
  }
  ngOnInit() {
    this.onCountryChange(this.country);
  }
  goback(){

    // if(this.getdata == ''){
    //   this.navCtrl.push("NotlogedinPage");
    // } else {
      this.navCtrl.push("MenuPage");
    // }
    // this.navCtrl.pop();
    // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.push("MenuPage");
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popToRoot();
    // this.navCtrl.canGoBack();
  }

}
