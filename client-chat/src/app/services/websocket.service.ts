import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  connection$!: WebSocketSubject<any>;

  constructor() { }

  connect(): Observable<any> {
    this.connection$ = webSocket({url: `ws://localhost:3000/ws/`, deserializer: e => e});
    console.log(this.connection$);
    return this.connection$;
  }

  joinRoom(name: string) {
    if(this.connection$) {
      this;this.connection$.next({ "type": "join", "message": name });
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  setName(name: string) {
    if(this.connection$) {
      this.connection$.next(`/name ${name}`);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  send(data: any): void {
    if (this.connection$) {
      let json_data = `${data}`;
      this.connection$.next(json_data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  getList() {
    if (this.connection$) {
      this.connection$.next({"type" : "list"});
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  getUsers() {
    if (this.connection$) {
      this.connection$.next('/list-clients');
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      //this.connection$ = null;
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
