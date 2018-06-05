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
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = /** @class */ (function () {
    function ModalPage(navCtrl, navParams, viewCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.callNumber = callNumber;
        this.emergencyCalls = [];
        this.emergencyNos = navParams.get('emergencyNos');
        this.emergencyCalls = this.emergencyNos;
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalPage');
    };
    ModalPage.prototype.select = function (data) {
        this.viewCtrl.dismiss(data);
    };
    ModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ModalPage.prototype.emerCall = function (callno) {
        this.callNumber.callNumber(callno, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    ModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal',
            templateUrl: 'modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, CallNumber])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.js.map