import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Loader } from "../../providers/loader/loader";
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

  corpocustoContent : boolean;
  travelAgencyContent : boolean;
  Rut : any;
  error : any = '';
  appID : any;
  empresaID : any;
  companyLogo : any;
  jid: any;
  name : any;
  senderJID : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private loader: Loader,
    private storage: Storage, public restProvider: RestProvider, public modalCtrl: ModalController, private alertCtrl: AlertController) {

    this.storage.get("senderJID").then((getsenderJID) => {
      console.log("getsenderJID", getsenderJID);
      this.senderJID = getsenderJID;
    });
    this.storage.get("empresaId").then((getempresaID) => {
      this.empresaID = getempresaID;
    });

    this.storage.get("appId").then((getappID) => {
      this.appID = getappID;
    });

    this.storage.get("isPassportLogin").then((resulst) => {
      if(resulst){
        this.Rut = this.navParams.get('Rut');

        this.storage.get("RUT").then((getRut) => {
          this.Rut = getRut;
        });

        this.corpocustoContent = true;
        this.travelAgencyContent = false;
      } else {
        this.corpocustoContent = false;
        this.travelAgencyContent = true;
      }
    });

    

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  chatting(){
    this.loader.show('Please Wait');
    this.restProvider.getJIDtoChat(this.Rut, this.appID)
      .then(data => {
        if(data['error']){
            let alert = this.alertCtrl.create({
              subTitle: data['error'],
              buttons: ['Dismiss']
            });
            alert.present();
            this.loader.hide();
        } else {

          this.jid = data['jid'];
          this.storage.set('name', data['nombre']);
          this.storage.set('reciverJID', this.jid);
          this.loader.hide();
          this.navCtrl.push("ChatPage", {'reciverJID' : this.jid});
        }
        
      }).catch(error => {
        console.log("rut error", error);
      });
  }

  traveladvice(){
    this.loader.show('Please Wait');
    console.log("on travel this.companyLogo", this.companyLogo);
    this.loader.hide();
    this.navCtrl.push("TraveladvicePage");
  }
  usefulinfo(){
    this.loader.show('Please Wait');
    console.log("on user info this.companyLogo", this.companyLogo);
    this.loader.hide();
    this.navCtrl.push("UsefulinfoPage");
  }
  phone(){
    this.loader.show('Please Wait');
    console.log("this.Rut.....1", this.Rut);
    this.restProvider.getEmergencyCall(this.Rut)
    .then(data => {
      if(data['error']){
        this.error = data['error'];
        this.loader.hide();
        console.log("this.error", this.error);
      } else {
        this.error = '';
        console.log("data", data);
        this.loader.hide();
        let modal = this.modalCtrl.create('ModalPage', {'emergencyNos':data['telefonosemergencia']});
        modal.present();
      }
    }).catch(error => {
      console.log("rut error", error);
      this.loader.hide();
      this.error = error.error['error'];
    });
  }

}
