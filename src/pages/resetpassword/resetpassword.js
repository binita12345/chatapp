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
import { EmailValidator } from '../../validators/email';
import { Loader } from "../../providers/loader/loader";
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResetpasswordPage = /** @class */ (function () {
    function ResetpasswordPage(navCtrl, navParams, plt, formBuilder, loader, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.loader = loader;
        this.toastCtrl = toastCtrl;
        this.resetForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
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
    ResetpasswordPage.prototype.reset = function () {
        this.error = '';
        this.loader.show('Please Wait');
        var email = this.resetForm.value.email;
        // this._AuthProvider.resetPasswordEmail(email).then(
        //     (res) => {   
        if (email) {
            this.loader.hide();
            var toastSuccess = this.toastCtrl.create({
                message: 'Password reset Link sent, please check your mail!',
                duration: 6000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'X',
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
    };
    ResetpasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-resetpassword',
            templateUrl: 'resetpassword.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, FormBuilder, Loader, ToastController])
    ], ResetpasswordPage);
    return ResetpasswordPage;
}());
export { ResetpasswordPage };
//# sourceMappingURL=resetpassword.js.map