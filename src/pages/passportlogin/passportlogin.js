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
import { RutValidator } from '../../validators/rut';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PassportloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PassportloginPage = /** @class */ (function () {
    function PassportloginPage(navCtrl, navParams, plt, formBuilder, keyboard, restProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.restProvider = restProvider;
        this.storage = storage;
        this.error = '';
        this.passportloginForm = formBuilder.group({
            usuario: ['', Validators.compose([Validators.required, RutValidator.isValid])]
            // usuario: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{8}-[a-zA-Z0-9]{1}')])]
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
    PassportloginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PassportloginPage');
    };
    PassportloginPage.prototype.onChange = function () {
        if (this.passportloginForm.value.usuario.length > -1) {
            this.error = '';
        }
    };
    PassportloginPage.prototype.passportlogin = function () {
        var _this = this;
        console.log("login by passport");
        console.log("rut data", this.passportloginForm.value.usuario);
        // this.storage.set('rutdata', this.passportloginForm.value.usuario);
        var rutData = this.passportloginForm.value.usuario;
        console.log(this.passportloginForm.value.usuario.length);
        if (this.passportloginForm.value.usuario == '' || this.passportloginForm.value.usuario.length == 0) {
            this.error = "please enter your RUT Usuario";
            // this.error = true;
        }
        else {
            // this.error = false;
            console.log("rutData", rutData);
            // this.storage.set('rutdata', rutData);
            this.restProvider.getRut(rutData)
                .then(function (data) {
                // this.rut = data;
                console.log("data", data);
                _this.empresaID = data['idempresa'];
                console.log("passport this.empresaID", _this.empresaID);
                _this.storage.set('empresaId', _this.empresaID);
                _this.storage.set('rut', data['RUT']);
                _this.storage.set('appid', data['appid']);
                console.log("data error", data['error']);
                if (data['error']) {
                    _this.error = data['error'];
                }
                else {
                    _this.storage.set('isPassportLogin', true);
                    // this.storage.set('rutdata', this.passportloginForm.value.usuario);
                    _this.navCtrl.push("PasswordPage", { rut: data['RUT'] });
                }
            }).catch(function (error) {
                console.log("rut error", error);
            });
        }
    };
    PassportloginPage.prototype.gotonotlogedin = function () {
        this.storage.remove('isPassportLogin');
        this.storage.remove('isLogin');
        console.log("clicked on skip");
        this.error = '';
        this.navCtrl.push("MenuPage");
    };
    PassportloginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-passportlogin',
            templateUrl: 'passportlogin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform,
            FormBuilder, Keyboard, RestProvider, Storage])
    ], PassportloginPage);
    return PassportloginPage;
}());
export { PassportloginPage };
//# sourceMappingURL=passportlogin.js.map