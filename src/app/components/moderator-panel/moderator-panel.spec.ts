import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorPanel } from './moderator-panel';

describe('ModeratorPanel', () => {
  let component: ModeratorPanel;
  let fixture: ComponentFixture<ModeratorPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
