import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-bug-report-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bug-report-form.html',
  styleUrl: './bug-report-form.scss'
})
export class BugReportForm implements OnInit {
  reportForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private deviceService: DeviceService
  ) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.reportForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      try {
        const deviceInfo = this.deviceService.getDeviceInfo();
        const location = await this.deviceService.getCurrentLocation();
        
        const reportData = {
          ...this.reportForm.value,
          device: deviceInfo.device,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          location: location || undefined
        };

        await this.firebaseService.addReport(reportData);
        this.submitSuccess = true;
        this.reportForm.reset();
        
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('Error submitting report:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  get name() { return this.reportForm.get('name'); }
  get email() { return this.reportForm.get('email'); }
  get description() { return this.reportForm.get('description'); }
}
