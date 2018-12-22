import { Component } from '@angular/core';
import {  ToastController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PayPal]
})
export class HomePage {
  amount: string = '50';
  response: any;

  constructor(private payPal: PayPal, private toastCtrl: ToastController) {

  }

  async pay() {
    try {
      await this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'AUtMZUTLHAx4RIdeoUvhluZuTzwcSF3A5OOdG91258_YjPKC5bpF-fhULdkSyDZ-TBx_pdGoyd367B9a'
      });
      await this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      }));

      let payment = new PayPalPayment(this.amount, 'USD', 'Description', 'sale');
      this.response = await this.payPal.renderSinglePaymentUI(payment);
      this.toastCtrl.create({ 'message': 'Payment Successful', 'closeButtonText': 'OK' })
      console.log(this.response);
    } catch (error) {
      this.response = error;
      console.error(error);
    }
  }
}

