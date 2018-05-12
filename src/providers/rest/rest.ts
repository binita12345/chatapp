import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

	headers = new Headers({ "Content-Type": "application/json" });

	// apiUrl = 'http://192.168.0.102:8080/ionic/consejosdeviaje.php';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  // second api for TravelAdvice /traerconsejosdeviaje/status
  // this service to get all travel advice 
  // This service returns a JSON with all the travel advice in JSON format, with links to the image type contents.
 	getTravelAdvice() {
	  return new Promise(resolve => {
	    this.http.get('http://sensussoft.com/ionic/consejosdeviaje.php').subscribe(data => {
	      resolve(data);
	      console.log("travel advice data", data);
	    }, err => {
	      console.log(err);
	    });
	  });
	}


	// // this api Validates the “RUT*:”and returns the some characteristics/parameters of the user.
	// // This service returns a JSON with the characteristics of the user.
	// // *RUT = is a number that identifies a chilean national, is a 7-8 sequence number followed by a dash and a number from 0 to 9 or ‘K’. examples: 9456789-K 18934567-4
	getRut(data) {
		console.log("service rut data" +data);
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('http://192.168.0.120:8080/ionic/Autenticacion.php?rut='+data)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	getClaveData(rut, clave) {
		console.log("service clave data", rut, clave);
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('http://192.168.0.120:8080/ionic/Autenticacion.php?rut='+rut+'&&clave='+clave)
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}


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
	// addEmergencyCall(data) {
	//   return new Promise((resolve, reject) => {
	//     this.http.post(this.apiUrl+'/telefonosemergencia', JSON.stringify(data))
	//       .subscribe(res => {
	//         resolve(res);
	//       }, (err) => {
	//         reject(err);
	//       });
	//   });
	// }

}
