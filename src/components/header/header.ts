import { Component , Input} from '@angular/core';
import { Storage } from "@ionic/storage";
import { App, IonicPage, NavController, NavParams } from "ionic-angular";
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

  	constructor(public navCtrl: NavController, public appCtrl: App,
    public app: App,
    private storage: Storage) {
    	console.log('Hello HeaderComponent Component');
    	this.text = 'Hello World';

      this.storage.get("isLogin").then((resulst) => {
      console.log("results login status", resulst);
      if(resulst){
        this.corpocustoHeader = true;
        this.travelAgencyHeader = false;
      } else {
        this.corpocustoHeader = false;
        this.travelAgencyHeader = true;
      }
    });
 	}

 	logout(){
 		console.log("logout");
 		// const root = this.app.getRootNav();
   //      root.popToRoot("PassportloginPage");
   		this.storage.clear();
      this.app.getRootNav().setRoot("PassportloginPage");
 	}

}
