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
import { Loader } from "../../providers/loader/loader";
/**
 * Generated class for the PassportloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PassportloginPage = /** @class */ (function () {
    function PassportloginPage(navCtrl, navParams, plt, loader, formBuilder, keyboard, restProvider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.loader = loader;
        this.formBuilder = formBuilder;
        this.keyboard = keyboard;
        this.restProvider = restProvider;
        this.storage = storage;
        this.error = '';
        this.passportloginForm = formBuilder.group({
            usuario: ['', Validators.compose([Validators.required, RutValidator.isValid])]
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
        this.error = '';
        this.loader.show('Please Wait');
        var rutData = this.passportloginForm.value.usuario;
        if (this.passportloginForm.value.usuario == '' || this.passportloginForm.value.usuario.length == 0) {
            this.error = "please enter your RUT Usuario";
            this.loader.hide();
        }
        else {
            this.restProvider.getRut(rutData)
                .then(function (data) {
                console.log("rut data");
                _this.empresaID = data['idempresa'];
                _this.storage.set('empresaId', _this.empresaID);
                _this.storage.set('rut', data['RUT']);
                _this.storage.set('appid', data['appid']);
                if (data['error']) {
                    _this.loader.hide();
                    _this.error = data['error'];
                }
                else {
                    _this.loader.hide();
                    _this.storage.set('isPassportLogin', true);
                    _this.navCtrl.push("PasswordPage", { rut: data['RUT'] });
                }
            }).catch(function (error) {
                console.log("rut error", error);
            });
        }
    };
    PassportloginPage.prototype.gotonotlogedin = function () {
        this.error = '';
        this.storage.remove('isPassportLogin');
        this.storage.remove('isLogin');
        this.navCtrl.push("MenuPage");
    };
    PassportloginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-passportlogin',
            templateUrl: 'passportlogin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, Loader,
            FormBuilder, Keyboard, RestProvider, Storage])
    ], PassportloginPage);
    return PassportloginPage;
}());
export { PassportloginPage };
//# sourceMappingURL=passportlogin.js.map