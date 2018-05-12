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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the NotlogedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotlogedinPage = /** @class */ (function () {
    function NotlogedinPage(navCtrl, navParams, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.toUser = {
            toUserId: '210000198410281948',
            toUserName: 'Hancock'
        };
    }
    NotlogedinPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotlogedinPage');
    };
    NotlogedinPage.prototype.chatting = function () {
        console.log("go to chattingPage");
        // this.socket.connect();
        // this.socket.emit('set-nickname', this.nickname);
        // this.navCtrl.push("ChatPage");
        // this.navCtrl.push("ChatPage", { nickname: this.nickname });
        this.navCtrl.push("ChatPage", { toUser: this.toUser });
    };
    NotlogedinPage.prototype.traveladvice = function () {
        this.navCtrl.push("TraveladvicePage");
    };
    NotlogedinPage.prototype.usefulinfo = function () {
        this.navCtrl.push("UsefulinfoPage");
    };
    NotlogedinPage.prototype.phone = function () {
        this.callNumber.callNumber("8734814110", true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    NotlogedinPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notlogedin',
            templateUrl: 'notlogedin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, CallNumber])
    ], NotlogedinPage);
    return NotlogedinPage;
}());
export { NotlogedinPage };
//# sourceMappingURL=notlogedin.js.map