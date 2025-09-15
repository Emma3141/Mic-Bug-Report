import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportForm } from './bug-report-form';

describe('BugReportForm', () => {
  let component: BugReportForm;
  let fixture: ComponentFixture<BugReportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugReportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugReportForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
