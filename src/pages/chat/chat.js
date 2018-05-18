var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { Socket } from 'ng-socket-io';
import { ChatService } from "../../providers/chat-service";
import { Events, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import moment from 'moment';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = /** @class */ (function () {
    // corpocustoHeader : boolean;
    // travelAgencyHeader : boolean;
    // corpocustoContent : boolean;
    // travelAgencyContent : boolean;
    // constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    function ChatPage(navCtrl, navParams, toastCtrl, chatService, events, storage, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.chatService = chatService;
        this.events = events;
        this.storage = storage;
        this.restProvider = restProvider;
        this.msgList = [];
        this.editorMsg = '';
        this.showEmojiPicker = false;
        this.storage.get('rutdata').then(function (getdata) {
            console.log('getdata ' + getdata);
            _this.getdata = getdata;
        });
        this.storage.get('senderJID').then(function (senderJID) {
            console.log('senderJID ' + senderJID);
            _this.senderJID = senderJID;
        });
        this.storage.get('reciverJID').then(function (reciverJID) {
            console.log('reciverJID ' + reciverJID);
            _this.reciverJID = reciverJID;
        });
        // this.reciverJID = this.navParams.get('reciverJID');
        // console.log("this.reciverJID", this.reciverJID);
        // this.senderJID = this.navParams.get('senderJID');
        // console.log("this.senderJID", this.senderJID);
        // this.name = this.navParams.get('name');
        // console.log("this.name", this.name);
        this.storage.get("name").then(function (getname) {
            console.log("getname", getname);
            _this.name = getname;
        });
        this.toUser = {
            id: navParams.get('toUserId'),
            name: navParams.get('toUserName')
        };
        // Get mock user information
        this.chatService.getUserInfo()
            .then(function (res) {
            _this.user = res;
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
        this.getMsg();
    }
    ChatPage.prototype.ionViewWillLeave = function () {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //get message list
        this.getMsg();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', function (msg) {
            _this.pushNewMsg(msg);
        });
    };
    ChatPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    ChatPage.prototype.switchEmojiPicker = function () {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        }
        else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    };
    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    ChatPage.prototype.getMsg = function () {
        var _this = this;
        // // Get mock message list
        // return this.chatService
        // .getMsgList()
        // .subscribe(res => {
        //   this.msgList = res;
        //   this.scrollToBottom();
        // });
        this.restProvider.getChatHistory(this.senderJID)
            .then(function (data) {
            // console.log("get msg history api data", data);
            _this.msgArray = data[''];
            console.log("this.msgArray", _this.msgArray);
            // console.log("this.msgArray['idremitente']", this.msgArray['idremitente']);
            // for(let msgs of this.msgArray){
            //   console.log("getting msgs", msgs);
            // }
            // if(idremitente == this.reciverJID){
            // }
        }).catch(function (error) {
            console.log("rut error", error);
        });
    };
    /**
     * @name sendMsg
     */
    ChatPage.prototype.sendMsg = function () {
        var _this = this;
        console.log("this.message", this.message);
        var sentData = {
            'mensaje': this.message,
            'JID': this.senderJID,
            'jid': this.reciverJID
        };
        console.log("sentData", sentData);
        this.restProvider.addMessageSent(sentData)
            .then(function (data) {
            console.log("sent msg api data", data);
        }).catch(function (error) {
            console.log("rut error", error);
        });
        if (!this.editorMsg.trim())
            return;
        // Mock message
        var id = Date.now().toString();
        var newMsg = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: moment().format('LT'),
            message: this.editorMsg,
            status: 'pending'
        };
        this.pushNewMsg(newMsg);
        this.editorMsg = '';
        if (!this.showEmojiPicker) {
            this.focus();
        }
        this.chatService.sendMsg(newMsg)
            .then(function () {
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                _this.msgList[index].status = 'success';
            }
        });
    };
    /**
     * @name pushNewMsg
     * @param msg
     */
    ChatPage.prototype.pushNewMsg = function (msg) {
        var userId = this.user.id, toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        }
        else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    };
    ChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgList.findIndex(function (e) { return e.messageId === id; });
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    ChatPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    ChatPage.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage.prototype.goback = function () {
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
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatPage.prototype, "content", void 0);
    __decorate([
        ViewChild('chat_input'),
        __metadata("design:type", ElementRef)
    ], ChatPage.prototype, "messageInput", void 0);
    ChatPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chat',
            templateUrl: 'chat.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ToastController, ChatService,
            Events, Storage, RestProvider])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.js.map