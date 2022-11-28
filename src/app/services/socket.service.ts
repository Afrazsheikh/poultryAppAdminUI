import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() { }

  joinAdmin(adminId)
  {
    this.socket = io(environment.socketURL, {transports: ["websocket"]});
    this.socket.emit('onAdminEnter', "ADMIN@" + adminId);
  }

  leaveAdmin(adminId)
  {
    this.socket = io(environment.socketURL, {transports: ["websocket"]});
    this.socket.emit('onAdminLeave', "ADMIN@" + adminId);
  }

  clearListeners()
  {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  on(eventName: any): Observable<any>
  {
    const subject = new Subject();

    this.socket.on(eventName, (data: any) => {
      subject.next([data]);
    });

    return subject.asObservable();
  }
}

