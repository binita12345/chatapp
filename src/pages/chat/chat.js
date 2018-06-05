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
    function ChatPage(navCtrl, navParams, toastCtrl, events, storage, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.storage = storage;
        this.restProvider = restProvider;
        this.msgArray = [];
        this.editorMsg = '';
        this.storage.get('rutdata').then(function (getdata) {
            _this.getdata = getdata;
        });
        this.storage.get('reciverJID').then(function (reciverJID) {
            _this.reciverJID = reciverJID;
        });
        this.storage.get('senderJID').then(function (senderJID) {
            _this.senderJID = senderJID;
        });
        this.storage.get("name").then(function (getname) {
            _this.name = getname;
        });
        this.toUser = {
            id: navParams.get('toUserId')
        };
        this.getMessage();
    }
    ChatPage.prototype.getMessage = function () {
        var _this = this;
        this.storage.get("isLogin").then(function (resulst) {
            if (resulst) {
                _this.storage.get("senderJID").then(function (getsenderJID) {
                    _this.senderJID = getsenderJID;
                    _this.restProvider.getChatHistory(_this.senderJID)
                        .then(function (data) {
                        _this.msgArray = data['historialdechat'];
                        for (var _i = 0, _a = _this.msgArray; _i < _a.length; _i++) {
                            var msgs = _a[_i];
                            _this.messages = msgs;
                            if (_this.messages['idremitente'] == _this.reciverJID) {
                                _this.toUser.id = _this.messages['idremitente'];
                            }
                            else {
                                _this.user = _this.messages['idremitente'];
                            }
                        }
                    }).catch(function (error) {
                        console.log("rut error", error);
                    });
                });
            }
        });
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        // unsubscribe
        this.getMessage();
        this.events.unsubscribe('chat:received');
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //get message list
        this.getMessage();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', function (msg) {
            _this.pushNewMsg(msg);
        });
    };
    ChatPage.prototype.onFocus = function () {
        this.content.resize();
        this.scrollToBottom();
    };
    /**
     * @name sendMsg
     */
    ChatPage.prototype.sendMsg = function () {
        var _this = this;
        if (!this.editorMsg.trim())
            return;
        console.log("this.editorMsg", this.editorMsg);
        // Mock message
        var id = Date.now().toString();
        var newMsg = {
            messageId: Date.now().toString(),
            JID: this.senderJID,
            jid: this.reciverJID,
            hora: moment().format('LT'),
            mensaje: this.editorMsg,
        };
        console.log("newMsg logs", newMsg);
        this.editorMsg = '';
        this.restProvider.addMessageSent(newMsg)
            .then(function (data) {
            console.log("sent msg api data ts", data);
            _this.scrollToBottom();
            _this.getMessage();
        }).catch(function (error) {
            console.log("rut error", error);
        });
    };
    /**
     * @name pushNewMsg
     * @param msg
     */
    ChatPage.prototype.pushNewMsg = function (msg) {
        console.log("this.senderJID push", this.senderJID);
        console.log("this.reciverJID push", this.reciverJID);
        console.log("push new msg", msg);
        var userId = this.senderJID, toUserId = this.reciverJID;
        // Verify user relationships
        if (msg.JID === this.senderJID && msg.jid === this.reciverJID) {
            this.msgArray.push(msg);
        }
        else if (msg.jid === this.senderJID && msg.JID === this.reciverJID) {
            this.msgArray.push(msg);
        }
        this.scrollToBottom();
    };
    ChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgArray.findIndex(function (e) { return e.messageId === id; });
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
        this.navCtrl.push("MenuPage");
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
        __metadata("design:paramtypes", [NavController, NavParams, ToastController,
            Events, Storage, RestProvider])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.js.map