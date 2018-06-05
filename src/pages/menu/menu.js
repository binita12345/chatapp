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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { Loader } from "../../providers/loader/loader";
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, callNumber, loader, storage, restProvider, modalCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.loader = loader;
        this.storage = storage;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.error = '';
        this.storage.get("senderJID").then(function (getsenderJID) {
            console.log("getsenderJID", getsenderJID);
            _this.senderJID = getsenderJID;
        });
        this.storage.get("empresaId").then(function (getempresaID) {
            _this.empresaID = getempresaID;
        });
        this.storage.get("appId").then(function (getappID) {
            _this.appID = getappID;
        });
        this.storage.get("isLogin").then(function (resulst) {
            if (resulst) {
                _this.Rut = _this.navParams.get('Rut');
                _this.storage.get("RUT").then(function (getRut) {
                    _this.Rut = getRut;
                });
                _this.corpocustoContent = true;
                _this.travelAgencyContent = false;
            }
            else {
                _this.corpocustoContent = false;
                _this.travelAgencyContent = true;
            }
        });
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.chatting = function () {
        var _this = this;
        this.loader.show('Please Wait');
        this.restProvider.getJIDtoChat(this.Rut, this.appID)
            .then(function (data) {
            if (data['error']) {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: data['error'],
                    buttons: ['Dismiss']
                });
                alert_1.present();
                _this.loader.hide();
            }
            else {
                _this.jid = data['jid'];
                _this.storage.set('name', data['nombre']);
                _this.storage.set('reciverJID', _this.jid);
                _this.loader.hide();
                _this.navCtrl.push("ChatPage", { 'reciverJID': _this.jid });
            }
        }).catch(function (error) {
            console.log("rut error", error);
        });
    };
    MenuPage.prototype.traveladvice = function () {
        this.loader.show('Please Wait');
        console.log("on travel this.companyLogo", this.companyLogo);
        this.loader.hide();
        this.navCtrl.push("TraveladvicePage");
    };
    MenuPage.prototype.usefulinfo = function () {
        this.loader.show('Please Wait');
        console.log("on user info this.companyLogo", this.companyLogo);
        this.loader.hide();
        this.navCtrl.push("UsefulinfoPage");
    };
    MenuPage.prototype.phone = function () {
        var _this = this;
        this.loader.show('Please Wait');
        console.log("this.Rut.....1", this.Rut);
        this.restProvider.getEmergencyCall(this.Rut)
            .then(function (data) {
            if (data['error']) {
                _this.error = data['error'];
                _this.loader.hide();
                console.log("this.error", _this.error);
            }
            else {
                _this.error = '';
                console.log("data", data);
                _this.loader.hide();
                var modal = _this.modalCtrl.create('ModalPage', { 'emergencyNos': data['telefonosemergencia'] });
                modal.present();
            }
        }).catch(function (error) {
            console.log("rut error", error);
        });
    };
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, CallNumber, Loader,
            Storage, RestProvider, ModalController, AlertController])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map