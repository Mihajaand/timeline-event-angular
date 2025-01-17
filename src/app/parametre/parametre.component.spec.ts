import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParametreComponent } from './parametre.component';

describe('ParametreComponent', () => {
  let component: ParametreComponent;
  let fixture: ComponentFixture<ParametreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ParametreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
