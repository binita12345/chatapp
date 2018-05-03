import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private formBuilder: FormBuilder) {
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

  passwordlogin(){
  	this.navCtrl.push("MenuPage");
  }

}
