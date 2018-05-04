import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  brag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private formBuilder: FormBuilder
) {

  	this.passportloginForm = formBuilder.group({
      usuario: ['', Validators.compose([Validators.required])]
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
    console.log("login by passport")
    console.log(this.passportloginForm.value.usuario.length);
    if(this.passportloginForm.value.usuario == '' || this.passportloginForm.value.usuario.length == 0){
      this.error = "please enter your RUT Usuario";
      // this.error = true;
    } else{
      // this.error = false;
      this.navCtrl.push("PasswordPage");

    }
  	// if(this.passportloginForm.value.usuario.length > 0){
   //    this.errors = false;
   //  }
  }

}
