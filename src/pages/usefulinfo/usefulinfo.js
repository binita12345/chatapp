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
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UsefulinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsefulinfoPage = /** @class */ (function () {
    function UsefulinfoPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        // countries : any;
        this.options = [];
        this.storage.get('rutdata').then(function (getdata) {
            console.log('getdata ' + getdata);
            _this.getdata = getdata;
        });
        this.options = [
            {
                "name": "India",
            }
        ];
        // this.currency = "currency"
        // this.capitalcity = "Capital City"
        // this.idiom = "Idiom"
        // this.numone = "Phone Number 01"
        // this.numtwo = "Phone Number 02"
        // this.numthree = "Phone Number 03"
        // this.address = "Address"
        // this.emailadd = "Email Address 01"
        this.currency = "";
        this.capitalcity = "";
        this.idiom = "";
        this.numone = "";
        this.numtwo = "";
        this.numthree = "";
        this.address = "";
        this.emailadd = "";
    }
    //  optionsFn() {
    //   console.log(this.countries);
    //   let item = this.countries;
    // }
    UsefulinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UsefulinfoPage');
    };
    UsefulinfoPage.prototype.goback = function () {
        if (this.getdata == '') {
            this.navCtrl.push("NotlogedinPage");
        }
        else {
            this.navCtrl.push("MenuPage");
        }
        // this.navCtrl.pop();
        // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
        // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
        // this.navCtrl.push("MenuPage");
        // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
        // this.navCtrl.popToRoot();
        // this.navCtrl.canGoBack();
    };
    UsefulinfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-usefulinfo',
            templateUrl: 'usefulinfo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], UsefulinfoPage);
    return UsefulinfoPage;
}());
export { UsefulinfoPage };
//# sourceMappingURL=usefulinfo.js.map