import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BugReport {
  id?: string;
  name: string;
  email: string;
  description: string;
  device: string;
  browser: string;
  os: string;
  timestamp: Date;
  isRead?: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  private get reportsCollection() {
    return collection(this.firestore, 'reports');
  }

  addReport(report: Omit<BugReport, 'id'>): Promise<any> {
    return addDoc(this.reportsCollection, {
      ...report,
      timestamp: new Date(),
      isRead: false
    });
  }

  getReports(): Observable<BugReport[]> {
    return collectionData(this.reportsCollection, { idField: 'id' }) as Observable<BugReport[]>;
  }

  markAsRead(reportId: string): Promise<void> {
    const reportDoc = doc(this.firestore, 'reports', reportId);
    return updateDoc(reportDoc, { isRead: true });
  }

  deleteReport(reportId: string): Promise<void> {
    const reportDoc = doc(this.firestore, 'reports', reportId);
    return deleteDoc(reportDoc);
  }
}