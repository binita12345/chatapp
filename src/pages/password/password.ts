import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private formBuilder: FormBuilder, public keyboard: Keyboard) {
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
    if(this.passwordloginForm.value.password == ''){
      this.error = "please enter your Password";
    } else{
      this.navCtrl.push("MenuPage");
    }
  }
  resetpassword(){
    this.navCtrl.push("ResetpasswordPage");
  }

  // keyboardCheck() {
  //    return !this.keyboard.show();
  // }

}
