import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { Events, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { RestProvider, ChatMessage, UserInfo } from '../../providers/rest/rest';
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

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgArray: any[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  getdata : any;
  reciverJID : any;
  name : any;
  senderJID : any;
  message : any;
  messages : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
              private events: Events, public storage: Storage, public restProvider: RestProvider) {

    this.storage.get('rutdata').then((getdata) => {
      this.getdata = getdata;
    });
    
    this.storage.get('reciverJID').then((reciverJID) => {
      this.reciverJID = reciverJID;
    });
    this.storage.get('senderJID').then((senderJID) => {
      this.senderJID = senderJID;
    });
    this.storage.get("name").then((getname) => {
      this.name = getname;
    });
    this.toUser = {
      id: navParams.get('toUserId')
    };
    this.getMessage();
  }

  getMessage(){
      this.storage.get("isLogin").then((resulst) => {
        if(resulst){
          this.storage.get("senderJID").then((getsenderJID) => {
            this.senderJID = getsenderJID;
            this.restProvider.getChatHistory(this.senderJID)
              .then(data => {
                this.msgArray = data['historialdechat'];
                for(let msgs of this.msgArray){
                  this.messages = msgs;
                  if(this.messages['idremitente'] == this.reciverJID){
                    this.toUser.id = this.messages['idremitente'];
                  } else {
                    this.user = this.messages['idremitente'];
                  }
                }
                
              }).catch(error => {
                console.log("rut error", error);
              });
          });
        } 
      });
    }

  ionViewWillLeave() {
    // unsubscribe
    this.getMessage();
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMessage();
    // Subscribe to received  new message events
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }
  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }
  /**
   * @name sendMsg
   */
  sendMsg() {

    if (!this.editorMsg.trim()) return;
    console.log("this.editorMsg", this.editorMsg);
    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      JID: this.senderJID,
      jid: this.reciverJID,
      hora: moment().format('LT'),
      mensaje: this.editorMsg,
    };
    console.log("newMsg logs", newMsg);
    
    this.editorMsg = '';
   
    this.restProvider.addMessageSent(newMsg)
      .then(data => {
        console.log("sent msg api data ts", data);
       
        this.scrollToBottom();
        this.getMessage();
      }).catch(error => {
        console.log("rut error", error);
      });
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    console.log("this.senderJID push", this.senderJID);
    console.log("this.reciverJID push", this.reciverJID);

    console.log("push new msg", msg)
    const userId = this.senderJID,
      toUserId = this.reciverJID;
      
    // Verify user relationships
    if (msg.JID === this.senderJID && msg.jid === this.reciverJID) {
      this.msgArray.push(msg);
    } else if (msg.jid === this.senderJID && msg.JID === this.reciverJID) {
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
      this.navCtrl.push("MenuPage");
  }
}
