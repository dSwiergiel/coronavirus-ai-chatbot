import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { MessageInput } from "./models/IMessage";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private options = {
    headers: new HttpHeaders().set("Content-Type", "application/json")
  };

  constructor(private http: HttpClient) {}

  SendMessage(input: MessageInput): any {
    console.log("TEXT:" + JSON.stringify(input));
    //let body = JSON.stringify(bill);
    //console.log(body);

    return this.http
      .post(environment.apiURL + "/ask", input, this.options)
      .pipe(
        catchError(err => {
          console.log(err);
          return "Something went wrong. Please try again later.";
        })
      );

    // return this.http.get("./assets/testData.json");
  }
}
