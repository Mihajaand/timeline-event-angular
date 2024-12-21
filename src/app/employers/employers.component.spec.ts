import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {EmployersComponent} from "./employers.component";


describe('EmployersComponent', () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmployersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
