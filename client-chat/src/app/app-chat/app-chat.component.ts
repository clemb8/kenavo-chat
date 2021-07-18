import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PseudoModalComponent } from '../pseudo-modal/pseudo-modal.component';


type Message = {
  author: string;
  message: string;
};

@Component({
  selector: 'app-app-chat',
  templateUrl: './app-chat.component.html',
  styleUrls: ['./app-chat.component.scss']
})
export class AppChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollDiscussion')
  private scrollDiscussion!: ElementRef;
  destroyed$ = new Subject();
  private routeSub:any;  // subscription to route observer
  pseudo : string = '';
  users: Array<String> = [];
  message: string = '';
  discussion: Message[] = [];
  ownMessage: string = "col-md-9 col-sm-9 col-9 comment rounded mb-2";
  otherMessage: string = "col-md-7 col-sm-7 col-8 response rounded mb-2";

  constructor(private socket : WebsocketService, public dialog: MatDialog, private router : Router) {

    //this.modal.modal('toogle');

    const socketSub$ = this.socket.connect().pipe(
      takeUntil(this.destroyed$),
    );

    socketSub$.subscribe(event => {

      console.log(event.data);
      let clients: string[] = event.data.split(',');

      switch(clients[0]) {
        case "New client":
          this.socket.getUsers();
          break;
        case "clients-list":
          let users: Array<string> = [];
          console.log(clients);
          clients.shift();
          clients.forEach(client => {
            if(client !== 'anon' && client !== 'undefined') {
              users.push(client);
            }
          });
          this.users = users;
          console.log(this.users);
          break;
        case "Message":
          let author = clients[1];
          let text = clients[2];
          if(author !== this.pseudo) {
            let object_message: Message = {
              author: author,
              message: text
            }
            this.discussion.push(object_message);
          }
          break;
        default:
          console.log("No control");
      }
    
    });

    this.socket.getUsers();
   }

  ngOnInit(): void {

    this.openDialog();

    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.socket.closeConnection();
      }
    });

  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    try {
      this.scrollDiscussion.nativeElement.scrollTop = this.scrollDiscussion.nativeElement.scrollHeight;
    } catch(error) {

    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PseudoModalComponent, {
      disableClose: true,
      width: '400px',
      data: { pseudo: this.pseudo, users: this.users }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pseudo = result;
      console.log(this.pseudo);
      this.socket.setName(this.pseudo);
    });
  }

  onSend(): void {
    this.socket.send(this.message);
    let object_message: Message = {
      author: this.pseudo,
      message: this.message
    }
    this.discussion.push(object_message);
    console.log(this.discussion);
    this.message = '';
  }

}
