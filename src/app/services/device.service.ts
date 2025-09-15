import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private deviceService: DeviceDetectorService) {}

  getDeviceInfo() {
    return {
      device: this.deviceService.getDeviceInfo().deviceType || 'Unknown',
      browser: `${this.deviceService.browser} ${this.deviceService.browser_version}`,
      os: `${this.deviceService.os} ${this.deviceService.os_version}`
    };
  }

  getCurrentLocation(): Promise<{latitude: number, longitude: number} | null> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          () => resolve(null)
        );
      } else {
        resolve(null);
      }
    });
  }
}