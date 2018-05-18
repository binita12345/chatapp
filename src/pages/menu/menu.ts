import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
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

  toUser : {toUserId: string, toUserName: string};
  // corpocustoHeader : boolean;
  // travelAgencyHeader : boolean;
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
  // nickname = 'Binita Doriwala';

  // constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private callNumber: CallNumber) {
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, 
    private storage: Storage, public restProvider: RestProvider, public modalCtrl: ModalController, private alertCtrl: AlertController) {

    // this.senderJID = this.navParams.get('senderJID');
    // console.log("this.senderJID", this.senderJID);
    this.storage.get("senderJID").then((getsenderJID) => {
      console.log("getsenderJID", getsenderJID);
      this.senderJID = getsenderJID;
    });
    this.storage.get("empresaId").then((getempresaID) => {
      // console.log("getempresaID", getempresaID);
      this.empresaID = getempresaID;
    });

    this.storage.get("appId").then((getappID) => {
      // console.log("getappID", getappID);
      this.appID = getappID;
    });

    this.storage.get("isLogin").then((resulst) => {
      // console.log("results login status", resulst);
      if(resulst){
        this.Rut = this.navParams.get('Rut');
        // console.log("this.Rut", this.Rut);

        this.storage.get("RUT").then((getRut) => {
          // console.log("getRut", getRut);
          this.Rut = getRut;
        });

        // this.appID = this.navParams.get('appId');
        // console.log("this.appID", this.appID);

        // this.empresaID = this.navParams.get('empresaId');
        // console.log("this.empresaID", this.empresaID);
        

        // this.restProvider.getCompanyIconImage(this.empresaID, this.appID)
        //   .then(data => {
        //     // this.rut = data;
        //     // if(data['error']){
        //     //   this.error = data['error'];
        //     //   console.log("this.error", this.error);
        //     // } else {
        //       console.log("data", data);
        //       this.corpocustoContent = true;
        //       this.companyLogo = data['urlarchivo'];
        //       this.storage.set('companyLogo', this.companyLogo);
        //       this.travelAgencyContent = false;
        //     // }
        //   }).catch(error => {
        //     console.log("rut error", error);
        //   });
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
    console.log("go to chattingPage");

    // this.socket.connect();
    // this.socket.emit('set-nickname', this.nickname);
    // this.navCtrl.push("ChatPage");
    // this.navCtrl.push("ChatPage", { nickname: this.nickname });
    console.log("set Rut", this.Rut);
    console.log("set appid", this.appID);
    this.restProvider.getJIDtoChat(this.Rut, this.appID)
      .then(data => {
        console.log("chat api data", data);
        if(data['error']){
            let alert = this.alertCtrl.create({
              // title: 'Low battery',
              subTitle: data['error'],
              buttons: ['Dismiss']
            });
            alert.present();
          console.log("this.error", this.error);
        } else {

          this.jid = data['jid'];
          // this.name = data['nombre'];
          this.storage.set('name', data['nombre']);
          this.storage.set('reciverJID', this.jid);
          // console.log(" this.senderJID",  this.senderJID);
          // this.storage.set('senderJID', this.senderJID)

          this.toUser = {
            toUserId: this.jid,
            toUserName: data['nombre']
          }
          this.navCtrl.push("ChatPage", {'reciverJID' : this.jid});
        }
        
      }).catch(error => {
        console.log("rut error", error);
      });
  }

  traveladvice(){
    console.log("on travel this.companyLogo", this.companyLogo);
    this.navCtrl.push("TraveladvicePage");
  }
  usefulinfo(){
    console.log("on user info this.companyLogo", this.companyLogo);
    this.navCtrl.push("UsefulinfoPage");
  }
  phone(){
    console.log("this.Rut.....1", this.Rut);
    this.restProvider.getEmergencyCall(this.Rut)
    .then(data => {
      // this.rut = data;
      if(data['error']){
        this.error = data['error'];
        console.log("this.error", this.error);
      } else {
        this.error = '';
        console.log("data", data);
        let modal = this.modalCtrl.create('ModalPage', {'emergencyNos':data['telefonosemergencia']});
        modal.present();
      }
    }).catch(error => {
      console.log("rut error", error);
    });

    // this.callNumber.callNumber("8734814110", true)
    // .then(() => console.log('Launched dialer!'))
    // .catch(() => console.log('Error launching dialer'));
  }

}
