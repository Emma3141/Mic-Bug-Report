import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugReportForm } from './components/bug-report-form/bug-report-form';
import { AdminLogin } from './components/admin-login/admin-login';
import { ModeratorPanel } from './components/moderator-panel/moderator-panel';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, BugReportForm, AdminLogin, ModeratorPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isAuthenticated = false;
  showAdminLogin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  onLoginSuccess() {
    this.isAuthenticated = true;
    this.showAdminLogin = false;
  }

  toggleAdminLogin() {
    this.showAdminLogin = !this.showAdminLogin;
  }
}
