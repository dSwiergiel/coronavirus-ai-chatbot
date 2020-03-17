import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MessageInput, MessageOutput } from "../models/IMessage";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChatService } from "../chat.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  messages: MessageOutput[];
  inputText: string = "";
  loading: boolean = false;
  sessionId: string = uuidv4();
  reactiveForm = new FormGroup({
    inputText: new FormControl("", [Validators.required])
  });

  @ViewChild("scrollMe", { static: false })
  private myScrollContainer: ElementRef;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.messages = [
      {
        MessageText: `We have the most up-to-date Novel Coronavirus (Covid-19) information ready to share with you. 

          Get the facts you can trust!`,
        IsFromBot: true
      },
      {
        MessageText: `What questions do you have?`,
        IsFromBot: true
      }
    ];
  }

  onSend(event) {
    event.preventDefault();
    this.loading = true;

    let messageInput = {
      inputText: this.reactiveForm.value.inputText,
      sessionId: this.sessionId
    } as MessageInput;
    this.scrollToBottom();

    this.addUserMessage(messageInput.inputText);

    // Make an HTTP Request
    this.chat.SendMessage(messageInput).subscribe(res => {
      this.addBotMessage(res);
      this.loading = false;
      this.scrollToBottom();
    });

    this.reactiveForm.setValue({
      inputText: ""
    });
  }

  handleUserMessage(event) {
    // console.log(event);
    const text = event.message;
    this.addUserMessage(text);

    this.loading = true;

    let messageInput = {} as MessageInput;

    messageInput.inputText = text;
    messageInput.sessionId = this.sessionId;
    // Make an HTTP Request
    this.chat.SendMessage(messageInput).subscribe(res => {
      this.addBotMessage(res);
      this.loading = false;
    });
  }

  addUserMessage(text) {
    this.messages.push({
      MessageText: text.trim(),
      IsFromBot: false
    });
  }

  addBotMessage(text) {
    this.messages.push({
      MessageText: text.trim(),
      IsFromBot: true
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }, 200);
  }
}
