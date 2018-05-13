var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PasswordPage = /** @class */ (function () {
    function PasswordPage(navCtrl, navParams, plt, formBuilder, keyboard, restProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.restProvider = restProvider;
        this.storage = storage;
        this.rut = this.navParams.get('rut');
        console.log("this.rut", this.rut);
        // this.storage.set('rutdata', this.rut);
        this.passwordloginForm = formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.required])]
        });
        if (this.plt.is('ios')) {
            // This will only print when on iOS
            console.log('I am an iOS device!');
            this.headerdisplay = true;
        }
        else if (this.plt.is('android')) {
            this.headerdisplay = false;
            console.log('I am an android device!');
        }
    }
    PasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordPage');
    };
    PasswordPage.prototype.onChange = function () {
        if (this.passwordloginForm.value.password.length > -1) {
            this.error = '';
        }
    };
    PasswordPage.prototype.passwordlogin = function () {
        var _this = this;
        console.log("this.passwordloginForm.value.password", this.passwordloginForm.value.password);
        var clave = this.passwordloginForm.value.password;
        console.log("clave", clave);
        console.log("rut", this.rut);
        // let loginData = {
        //   'rut' : this.rut,
        //   'clave' : clave
        // }
        // this.storage.set('logData', loginData);
        if (this.passwordloginForm.value.password == '') {
            this.error = "please enter your Password";
        }
        else {
            this.restProvider.getClaveData(this.rut, clave)
                .then(function (data) {
                // this.rut = data;
                console.log("clave api data", data);
                _this.navCtrl.push("MenuPage");
            });
        }
    };
    PasswordPage.prototype.resetpassword = function () {
        this.navCtrl.push("ResetpasswordPage");
    };
    PasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-password',
            templateUrl: 'password.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform,
            FormBuilder, Keyboard, RestProvider, Storage])
    ], PasswordPage);
    return PasswordPage;
}());
export { PasswordPage };
//# sourceMappingURL=password.js.map