import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

	emergencyNos : any;
	emergencyCalls : any = [];
	call : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private callNumber: CallNumber) {
  	this.emergencyNos = navParams.get('emergencyNos');
  	this.emergencyCalls = this.emergencyNos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  select(data){    
  	this.viewCtrl.dismiss(data);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  emerCall(callno){
  	this.callNumber.callNumber(callno, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

}
