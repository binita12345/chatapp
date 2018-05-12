import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the TraveladvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-traveladvice',
  templateUrl: 'traveladvice.html',
})
export class TraveladvicePage {

  advices: any;
	// advices: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  	this.advices = [
	    {image: "assets/imgs/Marqueta/12.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	    {image: "assets/imgs/Marqueta/13.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	    {image: "assets/imgs/Marqueta/14.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"},
	    {image: "assets/imgs/Marqueta/15.png", parag: "Lorem ipsum dolor sit amet,consectuter adispiscing elic, Nunc maximus, nulla ut commodo sagittis, sapuin dui mattis dui, non pulvinar lorem felis nec erat"}
	];

    this.getTravelAdviceData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TraveladvicePage');
  }

  goback(){
    this.navCtrl.pop();
  }

  getTravelAdviceData() {
    // this.restProvider.getTravelAdvice()
    // .then(data => {
    //   this.advices = data;
    //   console.log(this.advices);
    // });
  }

}
