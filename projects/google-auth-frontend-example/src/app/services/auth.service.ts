import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const BACKEND_URL = 'https://4d7bd6a28bcfd37d.ngrok.app';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private authWindow: Window | null = null;
  private tokenListener = new Subject<string>();

  constructor(private http: HttpClient) {
    // Pre-bind the message event handler to ensure it has the correct 'this' context
    this.handleAuthMessage = this.handleAuthMessage.bind(this);
  }

  initiateLogin(email: string): Observable<any> {
    // Trigger the login flow, which should return the URL for the popup
    return this.http.post(`${BACKEND_URL}/api/auth/google/login`, { email });
  }

  openAuthWindow(url: string) {
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    // Open the authentication popup
    this.authWindow = window.open(
      url,
      'AuthWindow',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for messages from the popup
    window.addEventListener('message', this.handleAuthMessage, false);
  }

  private handleAuthMessage(event: MessageEvent) {
    console.log('Received message:', event);
    // Ensure the message comes from a trusted domain
    if (event.origin !== BACKEND_URL) {
      console.error('Received message from untrusted domain:', event.origin);
      return;
    }

    // Process the message containing the idToken
    if (event.data && event.data.idToken) {
      console.log("Received token: ", event.data.idToken); // Log the received token
      localStorage.setItem('token', event.data.idToken); // Store the token
      // Notify subscribers that authentication is complete
      this.tokenListener.next(event.data.idToken);
      
      // Close the popup window if it's open
      if (this.authWindow) {
        this.authWindow.close();
        this.authWindow = null; // Reset the reference
      }

      // Remove the message event listener to clean up
      window.removeEventListener('message', this.handleAuthMessage, false);
    }
  }

  onAuthComplete(): Observable<string> {
    // Return an observable that emits the token once authentication is complete
    return this.tokenListener.asObservable();
  }
}
