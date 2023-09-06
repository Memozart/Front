import { EventEmitter, Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from './../../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  message: EventEmitter<boolean> = new EventEmitter();
  
  constructor(private deviceService: DeviceDetectorService, private http: HttpService) { }

  getDevice() {
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    let device = 'mobile';
    if (isTablet) {
      device = 'tablet';
    } else if (isDesktopDevice) {
      device = 'desktop';
    }
    return {
      device,
      userAgent: this.deviceService.getDeviceInfo().userAgent,
    };
  }

  async getTokenMessage() {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: environment.firebase.vapidKey,
    });
    return token;
  }

  listenToMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.message.emit(payload);
    });
  }

  requestPermission() {
    Notification.requestPermission().then(async (permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        await this.updateTokenMessage(this.getDevice());
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  async updateTokenMessage(deviceObj: any) {
    const token = await this.getTokenMessage();
    const diviceId = deviceObj.userAgent;
    const hash = CryptoJS.SHA256(diviceId).toString();
    const tokenData = {
      token: token,
      deviceId: hash
    };
    await firstValueFrom(this.http.post('messaging/token', tokenData));
  }
}
