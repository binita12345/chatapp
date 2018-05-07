import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Loader } from "../../providers/loader/loader";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private formBuilder: FormBuilder, private loader: Loader, public toastCtrl: ToastController) {

  	this.resetForm = formBuilder.group({	
	      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
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

  reset(){
  		this.error = ''
  		this.loader.show('Please Wait'); 
  		let email = this.resetForm.value.email;

  		// this._AuthProvider.resetPasswordEmail(email).then(
    //     (res) => {   
    	if(email){
    		this.loader.hide();        
          	let toastSuccess = this.toastCtrl.create({
		        message: 'Password reset Link sent, please check your mail!',
		        duration: 6000,
		        position: 'top',
		        showCloseButton:true,
		        closeButtonText:'X',
		        cssClass: "toast-success",
		    });
		    toastSuccess.present();
    	} 
          	
        // },
        //   (err) => {
        //     this.loader.hide();
        //     this.error = err.message;
        //   }
        // );
  		
  	}

}
