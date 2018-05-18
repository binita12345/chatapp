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
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    // nickname = 'Binita Doriwala';
    // constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private callNumber: CallNumber) {
    function MenuPage(navCtrl, navParams, callNumber, storage, restProvider, modalCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.storage = storage;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.error = '';
        this.senderJID = this.navParams.get('senderJID');
        console.log("this.senderJID", this.senderJID);
        this.storage.get("empresaId").then(function (getempresaID) {
            // console.log("getempresaID", getempresaID);
            _this.empresaID = getempresaID;
        });
        this.storage.get("appId").then(function (getappID) {
            // console.log("getappID", getappID);
            _this.appID = getappID;
        });
        this.storage.get("isLogin").then(function (resulst) {
            // console.log("results login status", resulst);
            if (resulst) {
                _this.Rut = _this.navParams.get('Rut');
                // console.log("this.Rut", this.Rut);
                _this.storage.get("RUT").then(function (getRut) {
                    // console.log("getRut", getRut);
                    _this.Rut = getRut;
                });
                // this.appID = this.navParams.get('appId');
                // console.log("this.appID", this.appID);
                // this.empresaID = this.navParams.get('empresaId');
                // console.log("this.empresaID", this.empresaID);
                // this.restProvider.getCompanyIconImage(this.empresaID, this.appID)
                //   .then(data => {
                //     // this.rut = data;
                //     // if(data['error']){
                //     //   this.error = data['error'];
                //     //   console.log("this.error", this.error);
                //     // } else {
                //       console.log("data", data);
                //       this.corpocustoContent = true;
                //       this.companyLogo = data['urlarchivo'];
                //       this.storage.set('companyLogo', this.companyLogo);
                //       this.travelAgencyContent = false;
                //     // }
                //   }).catch(error => {
                //     console.log("rut error", error);
                //   });
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
        console.log("go to chattingPage");
        // this.socket.connect();
        // this.socket.emit('set-nickname', this.nickname);
        // this.navCtrl.push("ChatPage");
        // this.navCtrl.push("ChatPage", { nickname: this.nickname });
        console.log("set Rut", this.Rut);
        console.log("set appid", this.appID);
        this.restProvider.getJIDtoChat(this.Rut, this.appID)
            .then(function (data) {
            console.log("chat api data", data);
            if (data['error']) {
                var alert_1 = _this.alertCtrl.create({
                    // title: 'Low battery',
                    subTitle: data['error'],
                    buttons: ['Dismiss']
                });
                alert_1.present();
                console.log("this.error", _this.error);
            }
            else {
                _this.jid = data['jid'];
                // this.name = data['nombre'];
                _this.storage.set('name', data['nombre']);
                _this.storage.set('reciverJID', _this.jid);
                _this.toUser = {
                    toUserId: _this.jid,
                    toUserName: data['nombre']
                };
                _this.navCtrl.push("ChatPage", { 'reciverJID': _this.jid, 'senderJID': _this.senderJID });
            }
        }).catch(function (error) {
            console.log("rut error", error);
        });
    };
    MenuPage.prototype.traveladvice = function () {
        console.log("on travel this.companyLogo", this.companyLogo);
        this.navCtrl.push("TraveladvicePage");
    };
    MenuPage.prototype.usefulinfo = function () {
        console.log("on user info this.companyLogo", this.companyLogo);
        this.navCtrl.push("UsefulinfoPage");
    };
    MenuPage.prototype.phone = function () {
        var _this = this;
        console.log("this.Rut.....1", this.Rut);
        this.restProvider.getEmergencyCall(this.Rut)
            .then(function (data) {
            // this.rut = data;
            if (data['error']) {
                _this.error = data['error'];
                console.log("this.error", _this.error);
            }
            else {
                _this.error = '';
                console.log("data", data);
                var modal = _this.modalCtrl.create('ModalPage', { 'emergencyNos': data['telefonosemergencia'] });
                modal.present();
            }
        }).catch(function (error) {
            console.log("rut error", error);
        });
        // this.callNumber.callNumber("8734814110", true)
        // .then(() => console.log('Launched dialer!'))
        // .catch(() => console.log('Error launching dialer'));
    };
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, CallNumber,
            Storage, RestProvider, ModalController, AlertController])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map