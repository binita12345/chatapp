import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Loader } from "../../providers/loader/loader";
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
  capital : any;
  idioma : any;
  nombre : any;
  direccion : any;
  email : any;
  telephone : any = [];
  selectedcountry : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public restProvider: RestProvider, private loader: Loader) {

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
          // this.restProvider.getuserInfo(this.appID)
          //   .then(data => {
          //     this.infoarray =  data;
          //     console.log("ts user data", this.infoarray['datosutiles']);
          //     this.informations = this.infoarray['datosutiles'];
          //     console.log("this.informations", this.informations);
             
          //     for(let info of this.informations){
          //       console.log("for loop info", info);
          //       this.userInfo = info['consulados'];
          //       console.log("this.userInfo", this.userInfo);
          //     }
          // });
        });
      } else {
        this.corpocustoInfo = false;
        this.travelAgencyInfo = true;
      }
    });
    
	}

  onCountryChange(country){
    this.error = '';
    console.log("country ", country);
    this.restProvider.getCountries()
      .subscribe(countries => {

        this.countries = countries;
        for (var i = 0; i < this.countries.length; i++)
        {
          // console.log("this.countries" +JSON.stringify(this.countries));
          // console.log("this.countries.....code" +this.countries[i]["alpha2Code"]);

          
          if (this.countries[i]["alpha2Code"] == country) {
            this.country = this.countries[i]["alpha2Code"];
            console.log("this.country", this.country);

            this.restProvider.getuserInfoWithCountry(this.appID, this.country)
              .then(data => {
                // console.log("data with country", data);
                this.selectedcountry = true;
                this.moneda = data['moneda'];
                // console.log("this.moneda", this.moneda);
                this.capital = data['capital'];
                // console.log("this.capital", this.capital);
                this.idioma = data['idioma'];
                // console.log("this.idioma", this.idioma);
                this.nombre = data['consulados'].nombre;
                // console.log("this.nombre", this.nombre);
                this.direccion = data['consulados'].direccion;
                // console.log("this.direccion", this.direccion);
                this.email = data['consulados'].email;

                this.telephone = data['consulados'].telefonos;
                console.log("this.telephone", this.telephone);
                // console.log("this.email", this.email);
                // if(data['error']){
                //   this.error = data['error'];
                //   this.informations = [];
                //   this.userInfo = [];
                // } else {
                  // this.error ='';
                  // this.infoarray =  data['paises'];
                  // console.log("ts user data", this.infoarray['datosutiles']);
                  // this.informations = this.infoarray['datosutiles'];
                  // console.log("this.informations", this.informations);
                 
                  // for(let info of this.informations){
                  //   console.log("for loop info", info);
                  //   this.userInfo = info['consulados'];
                  //   console.log("this.userInfo", this.userInfo);
                  // }
                // }
            }).catch(error => {
              console.log("user info error", error);
              this.loader.hide();
              this.error = "Pais no existe";
              this.moneda = '';
              this.capital = '';
              this.idioma = '';
              this.nombre = '';
              this.direccion = '';
              this.email = '';
            });
          } else {
            this.selectedcountry = false;
            // this.error = "Pais no existe";
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
