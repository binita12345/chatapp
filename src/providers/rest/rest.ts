import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { catchError } from 'rxjs/operators';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import moment from 'moment';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class ChatMessage {
  messageId: string;
  JID: string;
  jid: string;
  hora: number | string;
  mensaje: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class RestProvider {

	headers = new Headers({ "Content-Type": "application/json" });
	private apiUrl = 'https://restcountries.eu/rest/v2/all';

	// apiUrl = 'http://192.168.0.102:8080/ionic/consejosdeviaje.php';

  constructor(public http: HttpClient, private events: Events) {
    console.log('Hello RestProvider Provider');
  }

	private extractData(res: Response) {
	  let body = res;
	  return body || {};
	}

	private handleError (error: Response | any) {
	  let errMsg: string;
	  if (error instanceof Response) {
	    const err = error || '';
	    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	  } else {
	    errMsg = error.message ? error.message : error.toString();
	  }
	  console.error(errMsg);
	  return Observable.throw(errMsg);
	}

	getCountries(): Observable<string[]> {
	  return this.http.get(this.apiUrl).pipe(
	    map(this.extractData),
	    catchError(this.handleError)
	  );
	}
	// Entrega datos útiles por país, considerando entre otros, información de embajadas, direcciones, teléfonos entre otros.
	// Con el código ISO del Pais, puede recibir la información.
	// O en caso contrario entrega la información de todos los países que tiene cargados..

	getuserInfo(appId) {
		// console.log("service user info", appId);
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('http://sensussoft.com/ionic/datosutiles.php?app='+appId)
	      .subscribe(res => {
	      	// console.log("service res", res);
	        resolve(res);
	      }, (err) => {
	      	// console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	getuserInfoWithCountry(appId, Pais) {
		// console.log("service user info with country", appId, Pais);
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('http://sensussoft.com/ionic/datosutiles.php?app='+appId+'&&Pais='+Pais)
	      .subscribe(res => {
	      	// console.log("service res", res);
	        resolve(res);
	      }, (err) => {
	      	// console.log("service err", err);
	        reject(err);
	      });
	  });
	}

  // second api for TravelAdvice /traerconsejosdeviaje/status
  // this service to get all travel advice 
  // This service returns a JSON with all the travel advice in JSON format, with links to the image type contents.
 	getTravelAdvice() {
	  return new Promise((resolve,reject) => {
	    this.http.get('https://dev.gchat.cl/consejosdeviaje').subscribe(data => {
	      resolve(data);
	      // console.log("travel advice data", data);
	    }, (err) => {
	    	reject(err);
	      // console.log(err);
	    });
	  });
	}


	// // this api Validates the “RUT*:”and returns the some characteristics/parameters of the user.
	// // This service returns a JSON with the characteristics of the user.
	// // *RUT = is a number that identifies a chilean national, is a 7-8 sequence number followed by a dash and a number from 0 to 9 or ‘K’. examples: 9456789-K 18934567-4
	getRut(data) {
		// let creds = 'email=' + user.email + "&password=" + user.password;
		console.log("service rut data" +JSON.stringify(data));
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('https://dev.gchat.cl/autenticacion/'+data, {
            headers: new HttpHeaders().set('Authorization', 'Basic dXNlckFwaTozNGxxNG9kOHVzZGE='),
          })
	      .subscribe(res => {
	      	console.log("service res" +JSON.stringify(res));
	        resolve(res);
	      }, (err) => {
	      	console.log("service err" +JSON.stringify(err));
	        reject(err);
	      });
	  });
	}

	getClaveData(rut, clave) {
		// console.log("service clave data", rut, clave);
	  return new Promise((resolve, reject) => {
	    // this.http.get(this.apiUrl+'/autenticacion')
	    this.http.get('https://dev.gchat.cl/autenticacion/'+rut+ '/' +clave, {
            headers: new HttpHeaders().set('Authorization', 'Basic dXNlckFwaTozNGxxNG9kOHVzZGE='),
          })
	      .subscribe(res => {
	      	console.log("service clave res" +JSON.stringify(res));
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
	getEmergencyCall(Rut) {
	  return new Promise((resolve, reject) => {
	    this.http.get('http://dev.gchat.cl/telefonosemergencia/'+Rut)
	      .subscribe(res => {
	      	// console.log("service res", res);
	        resolve(res);
	      }, (err) => {
	      	// console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	// this api Returns the company name and logo.
	getCompanyIconImage(empresaId, appId) {
		// console.log("service company logo and name", empresaId, appId);
	  return new Promise((resolve, reject) => {
	    this.http.get('http://sensussoft.com/ionic/iconoempresa.php?empresa='+empresaId+'&&App='+appId)
	      .subscribe(res => {
	      	// console.log("service res" +JSON.stringify(res));
	        resolve(res);
	      }, (err) => {
	      	// console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	// It delivers the JID with which it corresponds to connect in the CHAT.
	getJIDtoChat(Rut, appId) {
		console.log("service to get chat", Rut, appId);
	  return new Promise((resolve, reject) => {
	    this.http.get('http://sensussoft.com/ionic/solicitarjidejecutivo.php?Rut='+Rut+'&&App='+appId)
	      .subscribe(res => {
	      	console.log("service res" +JSON.stringify(res));
	        resolve(res);
	      }, (err) => {
	      	console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	// // It delivers the JID with which it corresponds to connect in the CHAT.
	getChatHistory(senderJID) {
		console.log("service to get chat history", senderJID);
	  return new Promise((resolve, reject) => {
	    this.http.get('http://sensussoft.com/ionic/historialdechat.php?JID='+senderJID)
	      .subscribe(res => {
	      	console.log("service res",res);
	        resolve(res);
	      }, (err) => {
	      	console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	// It delivers the JID with which it corresponds to connect in the CHAT.
	addMessageSent(sentData) {

		// let headerOptions: any = { 'Content-Type': 'application/json' };
		// let headers = new Headers(headerOptions);
	console.log("service to get chat history" ,sentData);
	  return new Promise((resolve, reject) => {
	    this.http.get('http://sensussoft.com/ionic/mensajenviado.php?JID='+sentData.JID+'&&jid='+sentData.jid+'&&mensaje='+sentData.mensaje)
	      .subscribe(res => {
	      	console.log("service res",res);
	        resolve(res);
	      }, (err) => {
	      	console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	// this api Returns the company name and logo.
	getRecoverClave(Rut, appId, idempresa) {
		// console.log("service to get recover password", Rut, appId);
	  return new Promise((resolve, reject) => {
	    this.http.get('https://dev.gchat.cl/rescatarclave/'+Rut+ '/' +appId+ '/' +idempresa)
	      .subscribe(res => {
	      	console.log("service recover res" +JSON.stringify(res));
	        resolve(res);
	      }, (err) => {
	      	// console.log("service err", err);
	        reject(err);
	      });
	  });
	}

	  // mockNewMsg(msg) {
  //   const mockMsg: ChatMessage = {
  //     messageId: Date.now().toString(),
  //     userId: 'correos%gearlabs.cl@demo.radeon.cl',
  //     userName: 'Hancock',
  //     userAvatar: 'assets/imgs/Marqueta/ad.png',
  //     toUserId: 'kkskdkskdsk@dkdkdfddk.cl',
  //     hora: moment().format('LT'),
  //     mensaje: msg.mensaje,
  //     status: 'success'
  //   };

  //   setTimeout(() => {
  //     this.events.publish('chat:received', mockMsg, moment().format('LT'))
  //   }, Math.random() * 1800)
  // }

  // getMsgList(): Observable<ChatMessage[]> {
  //   const msgListUrl = './assets/mock/msg-list.json';
  //   return this.http.get<any>(msgListUrl)
  //   .pipe(map(response => response.array));
  // }

  // sendMsg(msg: ChatMessage) {
  //   return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
  //   .then(() => this.mockNewMsg(msg));
  // }

  // getUserInfo(): Promise<UserInfo> {
  //   const userInfo: UserInfo = {
  //     id: 'kkskdkskdsk@dkdkdfddk.cl',
  //     name: 'Luff',
  //     avatar: 'assets/imgs/Marqueta/dgs.png'
  //   };
  //   return new Promise(resolve => resolve(userInfo));
  // }

}
