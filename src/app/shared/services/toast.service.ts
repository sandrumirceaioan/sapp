import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export interface ToastOptions {
    type: 'danger' | 'warning' | 'success' | 'dark' | 'light';
    message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create({
      message: options.message,
      color: options.type,
      duration: 3000,
      position: 'bottom',
      animated: true
    });
    toast.present();
  }


}
