var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Storage } from "@ionic/storage";
import { App, NavController } from "ionic-angular";
import { RestProvider } from '../../providers/rest/rest';
// import { PassportloginPage } from '../../pages/passportlogin/passportlogin';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(navCtrl, app, restProvider, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.restProvider = restProvider;
        this.storage = storage;
        console.log('Hello HeaderComponent Component');
        this.text = 'Hello World';
        // this.storage.get("isLogin").then((resulst) => {
        //   console.log("results login status", resulst);
        //   if(resulst){
        //     this.corpocustoHeader = true;
        //     this.travelAgencyHeader = false;
        //   } else {
        //     this.corpocustoHeader = false;
        //     this.travelAgencyHeader = true;
        //   }
        // });
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
                // this.appID = this.navParams.get('appId');
                // console.log("this.appID", this.appID);
                // this.empresaID = this.navParams.get('empresaId');
                // console.log("this.empresaID", this.empresaID);
                _this.restProvider.getCompanyIconImage(_this.empresaID, _this.appID)
                    .then(function (data) {
                    // this.rut = data;
                    // if(data['error']){
                    //   this.error = data['error'];
                    //   console.log("this.error", this.error);
                    // } else {
                    // console.log("data", data);
                    _this.companyLogo = data['urlarchivo'];
                    _this.storage.set('companyLogo', _this.companyLogo);
                    _this.corpocustoHeader = true;
                    _this.travelAgencyHeader = false;
                    // }
                }).catch(function (error) {
                    // console.log("rut error", error);
                });
            }
            else {
                _this.corpocustoHeader = false;
                _this.travelAgencyHeader = true;
            }
        });
    }
    HeaderComponent.prototype.logout = function () {
        // console.log("logout");
        // const root = this.app.getRootNav();
        //      root.popToRoot("PassportloginPage");
        this.storage.clear();
        this.app.getRootNav().setRoot("PassportloginPage");
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "title", void 0);
    HeaderComponent = __decorate([
        Component({
            selector: 'header',
            templateUrl: 'header.html'
        }),
        __metadata("design:paramtypes", [NavController, App, RestProvider, Storage])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.js.map