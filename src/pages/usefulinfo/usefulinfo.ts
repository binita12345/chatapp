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

  countries: string[];
  errorMessage: string;
  appID : any;

  corpocustoInfo : boolean;
  travelAgencyInfo : boolean;
  country: any;
  error : any = '';
  infoarray : any =[];
  informations : any = [];
  userInfo : any = [];
  directionInfo : any;
  getcompanyLogo : any;
  moneda : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public restProvider: RestProvider) {

    this.storage.get('companyLogo').then((getcompanyLogo) => {
      console.log('getcompanyLogo',getcompanyLogo);
      this.getcompanyLogo = getcompanyLogo;
      console.log('this.getcompanyLogo',this.getcompanyLogo);
    });

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
             
              for(let info of this.informations){
                console.log("for loop info", info);
                this.userInfo = info['consulados'];
                console.log("this.userInfo", this.userInfo);
              }
          });
        });
      } else {
        this.corpocustoInfo = false;
        this.travelAgencyInfo = true;
      }
    });
    
	}

  onCountryChange(country){
    console.log("country ", country);
    this.restProvider.getCountries()
      .subscribe(countries => {

        this.countries = countries;
        for (var i = 0; i < this.countries.length; i++)
        {
          if (this.countries[i]['name'] == country) {
            this.country = this.countries[i]['name'];
            console.log("this.country", this.country);

            this.restProvider.getuserInfoWithCountry(this.appID, this.country)
              .then(data => {
                console.log("data with country", data);
                if(data['error']){
                  this.error = data['error'];
                  this.informations = [];
                  this.userInfo = [];
                } else {
                  this.error ='';
                  this.infoarray =  data['paises'];
                  console.log("ts user data", this.infoarray['datosutiles']);
                  this.informations = this.infoarray['datosutiles'];
                  console.log("this.informations", this.informations);
                 
                  for(let info of this.informations){
                    console.log("for loop info", info);
                    this.userInfo = info['consulados'];
                    console.log("this.userInfo", this.userInfo);
                  }
                }
            });
          }
        }
      },
      (error) =>  {
        console.log("get country err", error);
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
      this.navCtrl.push("MenuPage");
  }

}
