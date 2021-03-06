
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from './subscription';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private _http: HttpClient) {

  }
  public getSubscriptionID(): Observable<any> {
    return this._http.get<any>('http://localhost:8080/subscriptionid');
  }
  public saveSubscription(razorpay_payment_id: string, razorpay_subscription_id: string, razorpay_signature: string): Observable<any> {
    const subObj = new Subscription();
    subObj.razorpay_payment_id = razorpay_payment_id;
    subObj.razorpay_subscription_id = razorpay_subscription_id;
    subObj.razorpay_signature = razorpay_signature;

    return this._http.post<any>(`http://localhost:8080/savesubscription/${this.getId()}`, subObj);
  }

  public getSubscriptionAndLoginInfo(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/subscriptioninfo/${this.getId()}`);
  }
  public cancelSubscriptionID(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/cancelsubscription/${this.getId()}`);
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'user';
    let password = 'password';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    return basicAuthHeaderString;
  }
  getId() {
    let Id = sessionStorage.getItem('Id');
    console.log(Id);
    if (Id === null || Id === '' || Id == undefined) {
      Id = 'default';
    }
    return Id;
  }
}
