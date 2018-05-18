import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { Events, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

	// messages = [];
 //  // nickname = '';
 //  message = '';

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgArray: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  showEmojiPicker = false;
  getdata : any;
  reciverJID : any;
  name : any;
  senderJID : any;
  message : any;
  // msgArray : any;
  messages : any;
  // corpocustoHeader : boolean;
  // travelAgencyHeader : boolean;
  // corpocustoContent : boolean;
  // travelAgencyContent : boolean;

  // constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,private chatService: ChatService,
              private events: Events, public storage: Storage, public restProvider: RestProvider) {

    this.storage.get('rutdata').then((getdata) => {
      console.log('getdata ' +getdata);
      this.getdata = getdata;
    });
    
    this.storage.get('reciverJID').then((reciverJID) => {
      console.log('reciverJID ' +reciverJID);
      this.reciverJID = reciverJID;
    });
    this.storage.get("isLogin").then((resulst) => {
      console.log("results login status chat page", resulst);
      if(resulst){
        this.storage.get("senderJID").then((getsenderJID) => {
          console.log("getsenderJID", getsenderJID);
          this.senderJID = getsenderJID;
          this.restProvider.getChatHistory(this.senderJID)
            .then(data => {
              // console.log("get msg history api data", data);
              this.msgArray = data['historialdechat'];
              // console.log("this.msgArray", this.msgArray);
              // console.log("this.msgArray['idremitente']", this.msgArray['idremitente']);
              for(let msgs of this.msgArray){
                console.log("getting msgs", msgs);
                this.messages = msgs;
                console.log("this.messages['idremitente']", this.messages['idremitente']);
                console.log("this.reciverJID", this.reciverJID);
                if(this.messages['idremitente'] == this.reciverJID){
                  this.toUser.id = this.messages['idremitente'];
                } else {
                  this.user = this.messages['idremitente'];
                }
              }
              // console.log("getting messages", this.messages);
              // if(idremitente == this.reciverJID){

              // }

            }).catch(error => {
              console.log("rut error", error);
            });
        });
      } 
    });
    // this.reciverJID = this.navParams.get('reciverJID');
    // console.log("this.reciverJID", this.reciverJID);

    // this.senderJID = this.navParams.get('senderJID');
    // console.log("this.senderJID", this.senderJID);
    // this.name = this.navParams.get('name');
    // console.log("this.name", this.name);
    this.storage.get("name").then((getname) => {
      console.log("getname", getname);
      this.name = getname;
    });
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUserName')
    };
    // Get mock user information
    this.chatService.getUserInfo()
    .then((res) => {
      this.user = res
    });

    // this.storage.get("isLogin").then((resulst) => {
    //   console.log("results login status", resulst);
    //   if(resulst){
    //     this.corpocustoHeader = true;
    //     this.travelAgencyHeader = false;
    //     this.corpocustoContent = true;
    //     this.travelAgencyContent = false;
    //   } else {
    //     this.corpocustoHeader = false;
    //     this.travelAgencyHeader = true;
    //     this.corpocustoContent = false;
    //     this.travelAgencyContent = true;
    //   }
    // });
  	// this.nickname = this.navParams.get('nickname');
 
    // this.getMessages().subscribe(message => {
    //   this.messages.push(message);
    // });
 
    // this.getUsers().subscribe(data => {
    //   let user = data['user'];
    //   if (data['event'] === 'left') {
    //     this.showToast('User left: ' + user);
    //   } else {
    //     this.showToast('User joined: ' + user);
    //   }
    // });
    

  }
  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    // this.getMsg();

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }
  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  // /**
  //  * @name getMsg
  //  * @returns {Promise<ChatMessage[]>}
  //  */
  // getMsg() {
  //   // // Get mock message list
  //   // return this.chatService
  //   // .getmsgArray()
  //   // .subscribe(res => {
  //   //   this.msgArray = res;
  //   //   this.scrollToBottom();
  //   // });
    


  // }

  /**
   * @name sendMsg
   */
  sendMsg() {
    console.log("this.message", this.message);
    let sentData = {
      'JID' : this.senderJID,
      'jid' : this.reciverJID,
      'mensaje' : this.message
    }
    console.log("sentData", sentData);
    this.restProvider.addMessageSent(sentData)
      .then(data => {
        console.log("sent msg api data", data);

      }).catch(error => {
        console.log("rut error", error);
      });

    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      hora: moment().format('LT'),
      mensaje: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.chatService.sendMsg(newMsg)
    .then(() => {
      let index = this.getMsgIndexById(id);
      if (index !== -1) {
        this.msgArray[index].status = 'success';
      }
    })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgArray.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgArray.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgArray.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  goback(){
    // this.navCtrl.pop();
    // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
    // if(this.getdata == ''){
    //   this.navCtrl.push("NotlogedinPage");
    // } else {
      this.navCtrl.push("MenuPage");
    // }
    // this.navCtrl.push("MenuPage");
    // this.navCtrl.popToRoot();
    // this.navCtrl.canGoBack();
  }

  // goback(){
  //   // this.navCtrl.push("MenuPage");
  //   this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
  //   // this.navCtrl.popToRoot();
  //   // this.navCtrl.canGoBack();
  //   // this.navCtrl.pop();
  //   // console.log(this.navCtrl.getByIndex(this.navCtrl.length()-2));
  //   // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-2));
  // }

  // sendMessage() {
  //   this.socket.emit('add-message', { text: this.message });
  //   this.message = '';
  // }
 
  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //   })
  //   return observable;
  // }
 
  // getUsers() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('users-changed', (data) => {
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }
 
  // ionViewWillLeave() {
  //   this.socket.disconnect();
  // }
 
  // showToast(msg) {
  //   let toast = this.toastCtrl.create({
  //     message: msg,
  //     duration: 2000
  //   });
  //   toast.present();
  // }

}
