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
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { RutValidator } from '../../validators/rut';
import { Loader } from "../../providers/loader/loader";
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResetpasswordPage = /** @class */ (function () {
    function ResetpasswordPage(navCtrl, navParams, plt, formBuilder, loader, toastCtrl, restProvider, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.toastCtrl = toastCtrl;
        this.restProvider = restProvider;
        this.storage = storage;
        this.storage.get("isPassportLogin").then(function (resulst) {
            console.log("results passport login status", resulst);
            if (resulst) {
                _this.storage.get("rut").then(function (getRut) {
                    console.log("getRut", getRut);
                    _this.rut = getRut;
                });
                _this.storage.get("appid").then(function (getappid) {
                    console.log("getappid", getappid);
                    _this.appid = getappid;
                });
            }
        });
        this.resetForm = formBuilder.group({
            rut: ['', Validators.compose([Validators.required, RutValidator.isValid])]
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
    ResetpasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResetpasswordPage');
    };
    ResetpasswordPage.prototype.onChange = function () {
        if (this.resetForm.value.rut.length > -1) {
            this.error = '';
        }
    };
    ResetpasswordPage.prototype.reset = function () {
        var _this = this;
        // this.error = ''
        // this.loader.show('Please Wait'); 
        var rut = this.resetForm.value.rut;
        console.log("reset rut", rut);
        console.log("this.rut", this.rut);
        console.log("this.appid", this.appid);
        this.restProvider.getRecoverClave(rut, this.appid)
            .then(function (data) {
            // this.rut = data;
            console.log("data", data);
            // this.empresaID = data['idempresa'];
            // console.log("passport this.empresaID", this.empresaID);
            // this.storage.set('empresaId', this.empresaID);
            console.log("data error", data['error']);
            if (data['error']) {
                _this.error = data['error'];
            }
            else {
                _this.error = '';
                // this.storage.set('rutdata', this.passportloginForm.value.usuario);
                // this.navCtrl.push("PasswordPage", {rut: data['RUT']});
            }
        }).catch(function (error) {
            console.log("rut error", error);
        });
        // this._AuthProvider.resetPasswordrut(rut).then(
        //     (res) => {   
        // if(rut){
        // 	this.loader.hide();        
        //      	let toastSuccess = this.toastCtrl.create({
        //      message: 'Password reset Link sent, please check your mail!',
        //      duration: 6000,
        //      position: 'top',
        //      showCloseButton:true,
        //      closeButtonText:'X',
        //      cssClass: "toast-success",
        //  });
        //  toastSuccess.present();
        // } 
        // },
        //   (err) => {
        //     this.loader.hide();
        //     this.error = err.message;
        //   }
        // );
    };
    ResetpasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-resetpassword',
            templateUrl: 'resetpassword.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, FormBuilder,
            Loader, ToastController, RestProvider, Storage])
    ], ResetpasswordPage);
    return ResetpasswordPage;
}());
export { ResetpasswordPage };
//# sourceMappingURL=resetpassword.js.map