import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FirebaseService, BugReport } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-moderator-panel',
  imports: [CommonModule],
  templateUrl: './moderator-panel.html',
  styleUrl: './moderator-panel.scss'
})
export class ModeratorPanel implements OnInit, OnDestroy {
  reports: BugReport[] = [];
  private reportsSubscription: Subscription | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadReports();
  }

  ngOnDestroy() {
    if (this.reportsSubscription) {
      this.reportsSubscription.unsubscribe();
    }
  }

  loadReports() {
    this.reportsSubscription = this.firebaseService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      }
    });
  }

  markAsRead(reportId: string) {
    this.firebaseService.markAsRead(reportId).catch(error => {
      console.error('Error marking report as read:', error);
    });
  }

  deleteReport(reportId: string) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.firebaseService.deleteReport(reportId).catch(error => {
        console.error('Error deleting report:', error);
      });
    }
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  formatTimestamp(timestamp: any): string {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  }

  getLocationString(location: any): string {
    if (!location) return 'Not provided';
    return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  }
}
