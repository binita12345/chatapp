import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

	headerdisplay : any;
	public passwordloginForm:FormGroup;  
  error : any;
  rut : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, 
              private formBuilder: FormBuilder, public keyboard: Keyboard, public restProvider: RestProvider) {

    this.rut = this.navParams.get('rut');
    console.log("this.rut", this.rut);

  	this.passwordloginForm = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.required])]
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
    console.log('ionViewDidLoad PasswordPage');
  }

  onChange(){
    if(this.passwordloginForm.value.password.length > -1){
      this.error = '';
    }
  }

  passwordlogin(){
    console.log("this.passwordloginForm.value.password", this.passwordloginForm.value.password);

    let clave : any = this.passwordloginForm.value.password;
    console.log("clave", clave);
    console.log("rut", this.rut);

    if(this.passwordloginForm.value.password == ''){
      this.error = "please enter your Password";
    } else{
      this.restProvider.getClaveData(this.rut, clave)
      .then(data => {
        // this.rut = data;
        console.log("clave api data", data);
        this.navCtrl.push("MenuPage");
      });
      
    }
  }
  resetpassword(){
    this.navCtrl.push("ResetpasswordPage");
  }

  // keyboardCheck() {
  //    return !this.keyboard.show();
  // }

}
