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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map, catchError } from 'rxjs/operators';
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
        this.apiUrl = 'https://restcountries.eu/rest/v2/all';
        console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    RestProvider.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var err = error || '';
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    RestProvider.prototype.getCountries = function () {
        return this.http.get(this.apiUrl).pipe(map(this.extractData), catchError(this.handleError));
    };
    // Entrega datos útiles por país, considerando entre otros, información de embajadas, direcciones, teléfonos entre otros.
    // Con el código ISO del Pais, puede recibir la información.
    // O en caso contrario entrega la información de todos los países que tiene cargados..
    RestProvider.prototype.getuserInfo = function (appId) {
        var _this = this;
        // console.log("service user info", appId);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://sensussoft.com/ionic/datosutiles.php?app=' + appId)
                .subscribe(function (res) {
                // console.log("service res", res);
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
                reject(err);
            });
        });
    };
    RestProvider.prototype.getuserInfoWithCountry = function (appId, Pais) {
        var _this = this;
        // console.log("service user info with country", appId, Pais);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://sensussoft.com/ionic/datosutiles.php?app=' + appId + '&&Pais=' + Pais)
                .subscribe(function (res) {
                // console.log("service res", res);
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
                reject(err);
            });
        });
    };
    // second api for TravelAdvice /traerconsejosdeviaje/status
    // this service to get all travel advice 
    // This service returns a JSON with all the travel advice in JSON format, with links to the image type contents.
    RestProvider.prototype.getTravelAdvice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/consejosdeviaje.php').subscribe(function (data) {
                resolve(data);
                // console.log("travel advice data", data);
            }, function (err) {
                reject(err);
                // console.log(err);
            });
        });
    };
    // // this api Validates the “RUT*:”and returns the some characteristics/parameters of the user.
    // // This service returns a JSON with the characteristics of the user.
    // // *RUT = is a number that identifies a chilean national, is a 7-8 sequence number followed by a dash and a number from 0 to 9 or ‘K’. examples: 9456789-K 18934567-4
    RestProvider.prototype.getRut = function (data) {
        var _this = this;
        // console.log("service rut data" +data);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://sensussoft.com/ionic/autenticacion.php?rut=' + data)
                .subscribe(function (res) {
                // console.log("service res", res);
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
                reject(err);
            });
        });
    };
    RestProvider.prototype.getClaveData = function (rut, clave) {
        var _this = this;
        // console.log("service clave data", rut, clave);
        return new Promise(function (resolve, reject) {
            // this.http.get(this.apiUrl+'/autenticacion')
            _this.http.get('http://sensussoft.com/ionic/autenticacion.php?rut=' + rut + '&&clave=' + clave)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // // second api for predefined phrases --> /frasespredefinidas
    // // Deliver a list of predefined phrases for this executive given his id (cocha_ejecutivos) .o id (assistants)
    // predefinedPhrases(data) {
    //   return new Promise((resolve, reject) => {
    //     this.http.post(this.apiUrl+'/frasespredefinidascocha', JSON.stringify(data))
    //       .subscribe(res => {
    //         resolve(res);
    //       }, (err) => {
    //         reject(err);
    //       });
    //   });
    // }
    // // Delivery of emergency telephones for a given user - Returns emergency phone numbers given to certain user.
    // // With the user's RUT, the assigned executives and pool are reviewed, and these numbers are returned in that order.
    RestProvider.prototype.getEmergencyCall = function (Rut) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/telefonosemergencia.php?Rut=' + Rut)
                .subscribe(function (res) {
                // console.log("service res", res);
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
                reject(err);
            });
        });
    };
    // this api Returns the company name and logo.
    RestProvider.prototype.getCompanyIconImage = function (empresaId, appId) {
        var _this = this;
        // console.log("service company logo and name", empresaId, appId);
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/iconoempresa.php?empresa=' + empresaId + '&&App=' + appId)
                .subscribe(function (res) {
                // console.log("service res" +JSON.stringify(res));
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
                reject(err);
            });
        });
    };
    // It delivers the JID with which it corresponds to connect in the CHAT.
    RestProvider.prototype.getJIDtoChat = function (Rut, appId) {
        var _this = this;
        console.log("service to get chat", Rut, appId);
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/solicitarjidejecutivo.php?Rut=' + Rut + '&&App=' + appId)
                .subscribe(function (res) {
                console.log("service res" + JSON.stringify(res));
                resolve(res);
            }, function (err) {
                console.log("service err", err);
                reject(err);
            });
        });
    };
    // // It delivers the JID with which it corresponds to connect in the CHAT.
    RestProvider.prototype.getChatHistory = function (senderJID) {
        var _this = this;
        console.log("service to get chat history", senderJID);
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/historialdechat.php?JID=' + senderJID)
                .subscribe(function (res) {
                console.log("service res", res);
                resolve(res);
            }, function (err) {
                console.log("service err", err);
                reject(err);
            });
        });
    };
    // It delivers the JID with which it corresponds to connect in the CHAT.
    RestProvider.prototype.addMessageSent = function (sentData) {
        var _this = this;
        console.log("service to get chat history", sentData);
        return new Promise(function (resolve, reject) {
            _this.http.post('http://sensussoft.com/ionic/mensajenviado.php', sentData)
                .subscribe(function (res) {
                console.log("service res", res);
                resolve(res);
            }, function (err) {
                console.log("service err", err);
                reject(err);
            });
        });
    };
    // this api Returns the company name and logo.
    RestProvider.prototype.getRecoverClave = function (Rut, appId) {
        var _this = this;
        // console.log("service to get recover password", Rut, appId);
        return new Promise(function (resolve, reject) {
            _this.http.get('http://sensussoft.com/ionic/rescatarclave.php?Rut=' + Rut + '&&App=' + appId)
                .subscribe(function (res) {
                // console.log("service res" +JSON.stringify(res));
                resolve(res);
            }, function (err) {
                // console.log("service err", err);
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