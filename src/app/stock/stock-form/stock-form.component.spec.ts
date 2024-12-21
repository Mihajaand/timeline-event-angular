import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StockFormComponent } from './stock-form.component';

describe('StockFormComponent', () => {
  let component: StockFormComponent;
  let fixture: ComponentFixture<StockFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StockFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
