import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const BACKEND_URL = 'https://4d7bd6a28bcfd37d.ngrok.app';
const INSTITUTE_NAME = "FI"
const POPUP_TIMEOUT_MS = 5 * 1000; // 10 minutes

const VALID_EMAIL_REGEX = /[^]+@([^]+\.)+[^]{1,}/;

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private authWindow: Window | null = null;
  private tokenListener = new Subject<string>();
  router: any;
  popupTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private http: HttpClient) {
    // Pre-bind the message event handler to ensure it has the correct 'this' context
    this.handleAuthMessage = this.handleAuthMessage.bind(this);
  }

  initiateLogin(email: string) {
    console.log("Login with email: ", email)
    const url = this.getRedirectURL(email);
    this.openAuthWindow(url);
    this.listenForAuthCompletion();
  }

  
 
  private listenForAuthCompletion() {
    this.onAuthComplete().subscribe((token: string) => {
      console.log('Authentication successful, token:', token);
      // Redirect to the dashboard
      this.router.navigate(['/dashboard']);
    });
  }


  private getRedirectURL(email: string): string {
    if (!VALID_EMAIL_REGEX.test(email)) throw new Error('Invalid email address.');
    const domain = email.split('@')[1]; // Extract the domain part
    const domainParts = domain.split('.'); // Split the domain by dots

    const secondLevelDomain = domainParts[domainParts.length - 2].toUpperCase(); // Get the second-to-last part
    console.log("secondLevelDomain: ", secondLevelDomain);
    // Trigger the login flow, which should return the URL for the popup
    // return this.http.post(`${BACKEND_URL}/api/auth/google/login`, { email });
    const urlStr = "https://accounts.google.com/o/oauth2/v2/auth" // replace with a call to the backend.
    const urlObj = new URL(urlStr);
    const clientId = "438211543722-461ocqkfg2g0kkpetaq66d8ef0o7a5me.apps.googleusercontent.com"; // Replace with your OAuth2 client ID
    const redirectUri = "http://localhost:4200/callback"; // Replace with your redirect URI
    const responseType = "code"; // Typical response type for OAuth2
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    urlObj.searchParams.append('client_id', clientId);
    urlObj.searchParams.append('redirect_uri', redirectUri);
    urlObj.searchParams.append('response_type', responseType);
    urlObj.searchParams.append('scope', scope);
    urlObj.searchParams.append('login_hint', email);
    urlObj.searchParams.append('prompt', 'consent');
    urlObj.searchParams.append('access_type', 'online');
    console.log("URL: ", urlObj.toString());
    return urlObj.toString();
  }

  private openAuthWindow(url: string) {
    // this.ngZone.runOutsideAngular(() => {
    // this.closePopup(); // Close the popup window if it's still open
    const width = 600, height = 600;

    // Open the authentication popup
    this.authWindow = window.open(
      url,
      'AuthWindow',
      // `width=${width},height=${height}, top=${window.screenY + (window.outerHeight - height) / 2}, left=${window.screenX + (window.outerWidth - width) / 2}, status=0, menubar=0, toolbar=0, location=0, resizable=0, scrollbars=0, titlebar=0`
      `width=${width},height=${height}`
    );

    // console.log(this.authWindow?.closed)
    setInterval(() => {
      // this.authWindow?.close();
      console.log(this.authWindow?.closed)
    }, 3000);

    // this.startPopupTimeout();

    // Listen for messages from the popup
    window.addEventListener('message', this.handleAuthMessage, false);
    // });
  }

  private startPopupTimeout() {
    this.clearPopupTimeout();
    this.popupTimeout = setTimeout(() => {
      this.closePopup(); // Close the popup window if it's still open
    }, POPUP_TIMEOUT_MS);
  }

  private clearPopupTimeout() {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      console.log("Cleared popup timeout.")
    }
    this.popupTimeout = null;
  }

  private closePopup() {
    if (this.authWindow) {
      this.authWindow.close();
      console.log("Closed popup window.")
    }
    this.authWindow = null;
  }


  private handleAuthMessage(event: MessageEvent) {
    console.log('Received message:', event);
    // Ensure the message comes from a trusted domain
    // if (event.origin !== BACKEND_URL) {
    //   console.error('Received message from untrusted domain:', event.origin);
    //   return;
    // }

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
