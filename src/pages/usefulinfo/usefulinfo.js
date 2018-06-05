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
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the UsefulinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsefulinfoPage = /** @class */ (function () {
    function UsefulinfoPage(navCtrl, navParams, storage, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.error = '';
        this.infoarray = [];
        this.informations = [];
        this.userInfo = [];
        this.storage.get('companyLogo').then(function (getcompanyLogo) {
            console.log('getcompanyLogo', getcompanyLogo);
            _this.getcompanyLogo = getcompanyLogo;
            console.log('this.getcompanyLogo', _this.getcompanyLogo);
        });
        this.storage.get("isLogin").then(function (resulst) {
            console.log("results login status", resulst);
            if (resulst) {
                _this.corpocustoInfo = true;
                _this.travelAgencyInfo = false;
                _this.storage.get('appId').then(function (appID) {
                    console.log('appID ' + appID);
                    _this.appID = appID;
                    _this.restProvider.getuserInfo(_this.appID)
                        .then(function (data) {
                        _this.infoarray = data;
                        console.log("ts user data", _this.infoarray['datosutiles']);
                        _this.informations = _this.infoarray['datosutiles'];
                        console.log("this.informations", _this.informations);
                        for (var _i = 0, _a = _this.informations; _i < _a.length; _i++) {
                            var info = _a[_i];
                            console.log("for loop info", info);
                            _this.userInfo = info['consulados'];
                            console.log("this.userInfo", _this.userInfo);
                        }
                    });
                });
            }
            else {
                _this.corpocustoInfo = false;
                _this.travelAgencyInfo = true;
            }
        });
    }
    UsefulinfoPage.prototype.onCountryChange = function (country) {
        var _this = this;
        console.log("country ", country);
        this.restProvider.getCountries()
            .subscribe(function (countries) {
            _this.countries = countries;
            for (var i = 0; i < _this.countries.length; i++) {
                if (_this.countries[i]['name'] == country) {
                    _this.country = _this.countries[i]['name'];
                    console.log("this.country", _this.country);
                    _this.restProvider.getuserInfoWithCountry(_this.appID, _this.country)
                        .then(function (data) {
                        console.log("data with country", data);
                        if (data['error']) {
                            _this.error = data['error'];
                            _this.informations = [];
                            _this.userInfo = [];
                        }
                        else {
                            _this.error = '';
                            _this.infoarray = data['paises'];
                            console.log("ts user data", _this.infoarray['datosutiles']);
                            _this.informations = _this.infoarray['datosutiles'];
                            console.log("this.informations", _this.informations);
                            for (var _i = 0, _a = _this.informations; _i < _a.length; _i++) {
                                var info = _a[_i];
                                console.log("for loop info", info);
                                _this.userInfo = info['consulados'];
                                console.log("this.userInfo", _this.userInfo);
                            }
                        }
                    });
                }
            }
        }, function (error) {
            console.log("get country err", error);
        });
    };
    UsefulinfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UsefulinfoPage');
        this.onCountryChange(this.country);
    };
    UsefulinfoPage.prototype.ngOnInit = function () {
        this.onCountryChange(this.country);
    };
    UsefulinfoPage.prototype.goback = function () {
        this.navCtrl.push("MenuPage");
    };
    UsefulinfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-usefulinfo',
            templateUrl: 'usefulinfo.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, RestProvider])
    ], UsefulinfoPage);
    return UsefulinfoPage;
}());
export { UsefulinfoPage };
//# sourceMappingURL=usefulinfo.js.map