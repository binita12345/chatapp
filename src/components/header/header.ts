import { Component , Input} from '@angular/core';
import { Storage } from "@ionic/storage";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
import { RestProvider } from '../../providers/rest/rest';
import { Loader } from "../../providers/loader/loader";
import { AlertController } from 'ionic-angular';
// import { PassportloginPage } from '../../pages/passportlogin/passportlogin';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
	@Input() title: any;
  	text: string;

    corpocustoHeader : boolean;
    travelAgencyHeader : boolean;
    appID : any;
    empresaID : any;
    companyLogo : any;
    error : any = '';

  	constructor(public navCtrl: NavController, public app: App, public restProvider: RestProvider, 
      private storage: Storage, private loader: Loader, private alertCtrl: AlertController) {
    	console.log('Hello HeaderComponent Component');
    	this.text = 'Hello World';

      // this.storage.get("isLogin").then((resulst) => {
      //   console.log("results login status", resulst);
      //   if(resulst){
      //     this.corpocustoHeader = true;
      //     this.travelAgencyHeader = false;
      //   } else {
      //     this.corpocustoHeader = false;
      //     this.travelAgencyHeader = true;
      //   }
      // });

    this.storage.get("empresaId").then((getempresaID) => {
      // console.log("getempresaID", getempresaID);
      this.empresaID = getempresaID;
    });

    this.storage.get("appId").then((getappID) => {
      console.log("getappID", getappID);
      this.appID = getappID;
    });

    this.storage.get("isLogin").then((resulst) => {
      // console.log("results login status", resulst);
      if(resulst){

        // this.appID = this.navParams.get('appId');
        // console.log("this.appID", this.appID);

        // this.empresaID = this.navParams.get('empresaId');
        // console.log("this.empresaID", this.empresaID);

        this.restProvider.getCompanyIconImage(this.empresaID, this.appID)
          .then(data => {
            // this.rut = data;
            // if(data['error']){
            //   this.error = data['error'];
            //   console.log("this.error", this.error);
            // } else {
              console.log("data header compny info", data);
              this.companyLogo = data['urlarchivo'];
              this.storage.set('companyLogo', this.companyLogo);
              this.corpocustoHeader = true;
              this.travelAgencyHeader = false;
            // }
          }).catch(error => {
            console.log("company info error", error);
            this.loader.hide();
            let alert = this.alertCtrl.create({
              title: 'error',
              subTitle: error.error['error'],
              buttons: ['Dismiss']
            });
            alert.present();
            // this.error = error.error['error'];
          });
      } else {
        this.corpocustoHeader = false;
        this.travelAgencyHeader = true;
      }
    });
      
 	}

 	logout(){
 		// console.log("logout");
 		// const root = this.app.getRootNav();
   //      root.popToRoot("PassportloginPage");
   		this.storage.clear();
      this.app.getRootNav().setRoot("PassportloginPage");
 	}

}
