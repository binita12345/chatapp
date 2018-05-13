var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = /** @class */ (function () {
    // apiUrl = 'http://192.168.0.102:8080/ionic/consejosdeviaje.php';
    function RestProvider(http) {
        this.http = http;
        this.headers = new Headers({ "Content-Type": "application/json" });
        console.log('Hello RestProvider Provider');
    }
    // second api for TravelAdvice /traerconsejosdeviaje/status
    // this service to get all travel advice 
    // This service returns a JSON with all the travel advice in JSON format, with links to the image type contents.
    RestProvider.prototype.getTravelAdvice = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://sensussoft.com/ionic/consejosdeviaje.php').subscribe(function (data) {
                resolve(data);
                console.log("travel advice data", data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    // // this api Validates the “RUT*:”and returns the some characteristics/parameters of the user.
    // // This service returns a JSON with the characteristics of the user.
    // // *RUT = is a number that identifies a chilean national, is a 7-8 sequence number followed by a dash and a number from 0 to 9 or ‘K’. examples: 9456789-K 18934567-4
    RestProvider.prototype.getRut = function (data) {
        var _this = this;
        console.log("service rut data" + data);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://192.168.0.120:8080/ionic/Autenticacion.php?rut=' + data)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider.prototype.getClaveData = function (rut, clave) {
        var _this = this;
        console.log("service clave data", rut, clave);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://192.168.0.120:8080/ionic/Autenticacion.php?rut=' + rut + '&&clave=' + clave)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map