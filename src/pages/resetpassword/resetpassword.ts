import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutValidator } from '../../validators/rut';
import { Loader } from "../../providers/loader/loader";
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

	headerdisplay : any;
	public resetForm:FormGroup;
	error : any;
  rut : any;
  appid : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private formBuilder: FormBuilder, 
    private loader: Loader, public toastCtrl: ToastController, public restProvider: RestProvider, private storage: Storage) {

    this.storage.get("isPassportLogin").then((resulst) => {
      console.log("results passport login status", resulst);
      if(resulst){
        this.storage.get("rut").then((getRut) => {
          console.log("getRut", getRut);
          this.rut = getRut;
        });
        this.storage.get("appid").then((getappid) => {
          console.log("getappid", getappid);
          this.appid = getappid;
        });
      }
    });

  	this.resetForm = formBuilder.group({	
	      rut: ['', Validators.compose([Validators.required, RutValidator.isValid])]
	  })

  	if (this.plt.is('ios')) {
      // This will only print when on iOS
      console.log('I am an iOS device!');
      this.headerdisplay = true;
    } else if (this.plt.is('android')) {
    	this.headerdisplay = false;
      	console.log('I am an android device!');

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  onChange(){
    if(this.resetForm.value.rut.length > -1){
      this.error = '';
    }
  }

  reset(){
  		// this.error = ''
  		// this.loader.show('Please Wait'); 
  		let rut = this.resetForm.value.rut;
      console.log("reset rut", rut);
      console.log("this.rut", this.rut);
      console.log("this.appid", this.appid);
      this.restProvider.getRecoverClave(rut, this.appid)
      .then(data => {
        // this.rut = data;
        console.log("data", data);
        // this.empresaID = data['idempresa'];
        // console.log("passport this.empresaID", this.empresaID);
        // this.storage.set('empresaId', this.empresaID);

        console.log("data error", data['error']);

        if(data['error']){
          this.error = data['error'];
        } else {
          this.error = '';
          // this.storage.set('rutdata', this.passportloginForm.value.usuario);
          // this.navCtrl.push("PasswordPage", {rut: data['RUT']});

        }
      }).catch(error => {
        console.log("rut error", error);
      });

  		// this._AuthProvider.resetPasswordrut(rut).then(
    //     (res) => {   
    	// if(rut){
    	// 	this.loader.hide();        
     //      	let toastSuccess = this.toastCtrl.create({
		   //      message: 'Password reset Link sent, please check your mail!',
		   //      duration: 6000,
		   //      position: 'top',
		   //      showCloseButton:true,
		   //      closeButtonText:'X',
		   //      cssClass: "toast-success",
		   //  });
		   //  toastSuccess.present();
    	// } 
          	
        // },
        //   (err) => {
        //     this.loader.hide();
        //     this.error = err.message;
        //   }
        // );
  		
  	}

}
