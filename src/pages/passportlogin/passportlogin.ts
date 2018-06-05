import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { RutValidator } from '../../validators/rut';
import { Storage } from '@ionic/storage';
import { Loader } from "../../providers/loader/loader";
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
  empresaID : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private loader: Loader,
              private formBuilder: FormBuilder, public keyboard: Keyboard, public restProvider: RestProvider, public storage: Storage) {

  	this.passportloginForm = formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, RutValidator.isValid])]
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
    this.error = '';
    this.loader.show('Please Wait');
    let rutData : any = this.passportloginForm.value.usuario;

    if(this.passportloginForm.value.usuario == '' || this.passportloginForm.value.usuario.length == 0){
      this.error = "please enter your RUT Usuario";
      this.loader.hide();
    } else{
      this.restProvider.getRut(rutData)
      .then(data => {
        console.log("rut data", data);
        this.empresaID = data['idempresa'];

        this.storage.set('empresaId', this.empresaID);
        this.storage.set('rut', data['RUT']);
        this.storage.set('appid', "23982933");

        if(data['error']){
          this.loader.hide();
          this.error = data['error'];
        } else {
          this.loader.hide();
          this.storage.set('isPassportLogin', true);
          this.navCtrl.push("PasswordPage", {rut: data['RUT']});

        }
      }).catch(error => {
        console.log("rut error", error);
        this.loader.hide();
        this.error = error.error['error'];

      });
    }
  }

  gotonotlogedin(){
    this.error = '';
    this.storage.remove('isPassportLogin');
    this.storage.remove('isLogin');
    this.navCtrl.push("MenuPage");
  }
}
