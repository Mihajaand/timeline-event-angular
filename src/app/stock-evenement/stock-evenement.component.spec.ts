import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockEvenementComponent } from './stock-evenement.component';

describe('StockEvenementComponent', () => {
  let component: StockEvenementComponent;
  let fixture: ComponentFixture<StockEvenementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StockEvenementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
