import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgetPassword, ResultLogin, SendOTPDate, User, UserLogin, VerifyUser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000/api/auth/';

  constructor(private http:HttpClient) { }

  // login
  login(user: UserLogin): Observable<ResultLogin> {
    return this.http.post<ResultLogin>(this.apiUrl+'login', user);
  }

  //register
  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl+'register', user);
  }
  // verify
  verify(userData: VerifyUser): Observable<any> {
      return this.http.post(this.apiUrl+'verify-otp', userData);
  }
  // sendOTP
  sendOTP(email: SendOTPDate): Observable<any> {
      return this.http.post(this.apiUrl+'send-otp', email);
  }

  // forgetPassword
  forgetPassword(forgetPasswordData: ForgetPassword): Observable<any> {
      return this.http.put(this.apiUrl+'forget-password',forgetPasswordData);
  }
}
