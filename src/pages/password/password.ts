import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Loader } from "../../providers/loader/loader";
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
  appID : any;
  empresaID : any;
  JID : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private loader: Loader,
              private formBuilder: FormBuilder, public keyboard: Keyboard, public restProvider: RestProvider, public storage: Storage) {

    this.rut = this.navParams.get('rut');

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
    this.error = '';
    this.loader.show('Please Wait');
    let clave : any = this.passwordloginForm.value.password;
    
    if(this.passwordloginForm.value.password == ''){
      this.error = "please enter your Password";
    } else{
      this.restProvider.getClaveData(this.rut, clave)
      .then(data => {
        console.log("clave data", data);
        this.appID = "23982933";
        this.storage.set('appId', this.appID);
        this.empresaID = data['idempresa'];
        this.storage.set('empresaId', this.empresaID);

        if(data['error']){
          this.error = data['error'];
          this.loader.hide();       
        } else {
          this.storage.set('isLogin', true);
          this.storage.set('RUT', data['RUT']);
          this.JID = data['JID'];
          this.storage.set('senderJID', this.JID);
          this.loader.hide();        
          this.navCtrl.push("MenuPage");
        }
      }).catch(error => {
        console.log("clave error", error);
        this.loader.hide();
        this.error = error.error['error'];

      });
      
    }
  }
  resetpassword(){
    this.navCtrl.push("ResetpasswordPage");
  }
}
