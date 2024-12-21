import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigPopoverComponent } from './config-popover.component';

describe('ConfigPopoverComponent', () => {
  let component: ConfigPopoverComponent;
  let fixture: ComponentFixture<ConfigPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfigPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
