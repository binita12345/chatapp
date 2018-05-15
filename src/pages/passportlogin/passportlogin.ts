import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { RutValidator } from '../../validators/rut';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PassportloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passportlogin',
  templateUrl: 'passportlogin.html',
})
export class PassportloginPage {

	headerdisplay : any;
	public passportloginForm:FormGroup;  
  error : any = '';
  rut : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, 
              private formBuilder: FormBuilder, public keyboard: Keyboard, public restProvider: RestProvider, public storage: Storage) {

  	this.passportloginForm = formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, RutValidator.isValid])]
      // usuario: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{8}-[a-zA-Z0-9]{1}')])]
    });

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
    console.log('ionViewDidLoad PassportloginPage');
  }

  onChange(){
    if(this.passportloginForm.value.usuario.length > -1){
      this.error = '';
    }
  }
  
  passportlogin(){
    console.log("login by passport");
    console.log("rut data", this.passportloginForm.value.usuario);
    // this.storage.set('rutdata', this.passportloginForm.value.usuario);

    let rutData : any = this.passportloginForm.value.usuario;

    console.log(this.passportloginForm.value.usuario.length);
    if(this.passportloginForm.value.usuario == '' || this.passportloginForm.value.usuario.length == 0){
      this.error = "please enter your RUT Usuario";
      // this.error = true;
    } else{
      // this.error = false;
      console.log("rutData", rutData);
      // this.storage.set('rutdata', rutData);

      this.restProvider.getRut(rutData)
      .then(data => {
        // this.rut = data;
        console.log("data", data);
        console.log("data error", data['error']);

        if(data['error']){
          this.error = data['error'];
        } else {
          // this.storage.set('rutdata', this.passportloginForm.value.usuario);
          this.navCtrl.push("PasswordPage", {rut: data['RUT']});

        }
        // this.navCtrl.push("PasswordPage");
        // if(data == "RUT no existe"){

        // }
        // console.log(this.rut);
      }).catch(error => {
        console.log("rut error", error);
      });
      

    }
  	// if(this.passportloginForm.value.usuario.length > 0){
   //    this.errors = false;
   //  }
  }

  gotonotlogedin(){
    this.error = '';
    this.navCtrl.push("MenuPage");
  }

  // keyboardCheck() {
  //    return !this.keyboard.show();
  // }

}
