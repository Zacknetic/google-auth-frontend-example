import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule, HttpClientModule],
	providers: [AuthService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	email: string = '';

	constructor(private authService: AuthService, private router: Router) { }

	loginWithEmail() {
		// this.authService.openAuthWindow('https://www.youtube.com/watch?v=xvFZjo5PgG0'); // Open a Rick Roll
		this.authService.initiateLogin(this.email);
		// this.authService.initiateLogin(this.email).subscribe({
		// 	next: (response: { redirectUrl: any }) => {
		// 		// this.authService.openAuthWindow("https://www.youtube.com/watch?v=xvFZjo5PgG0")// Open a Rick Roll
		// 		// setTimeout(() => {
		// 			this.authService.openAuthWindow(response.redirectUrl);
		// 		// }, 5000);
		// 		this.listenForAuthCompletion();
		// 	},
		// 	error: (error: any) => console.error('Login error:', error),
		// });
	}

	private listenForAuthCompletion() {
		this.authService.onAuthComplete().subscribe((token: string) => {
			console.log('Authentication successful, token:', token);
			// Redirect to the dashboard
			this.router.navigate(['/dashboard']);
		});
	}
}
