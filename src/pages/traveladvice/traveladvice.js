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
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the TraveladvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TraveladvicePage = /** @class */ (function () {
    // advices: any = [];
    function TraveladvicePage(navCtrl, navParams, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.advices = [
            { image: "assets/imgs/Marqueta/12.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat" },
            { image: "assets/imgs/Marqueta/13.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat" },
            { image: "assets/imgs/Marqueta/14.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat" },
            { image: "assets/imgs/Marqueta/15.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat" }
        ];
        this.getTravelAdviceData();
    }
    TraveladvicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TraveladvicePage');
    };
    TraveladvicePage.prototype.goback = function () {
        // this.navCtrl.pop();
        this.navCtrl.push("MenuPage");
    };
    TraveladvicePage.prototype.getTravelAdviceData = function () {
        // this.restProvider.getTravelAdvice()
        // .then(data => {
        //   this.advices = data;
        //   console.log(this.advices);
        // });
    };
    TraveladvicePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-traveladvice',
            templateUrl: 'traveladvice.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider])
    ], TraveladvicePage);
    return TraveladvicePage;
}());
export { TraveladvicePage };
//# sourceMappingURL=traveladvice.js.map