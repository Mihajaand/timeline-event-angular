import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ConteneursComponent} from "./conteneurs.component";


describe('ClientsComponent', () => {
  let component: ConteneursComponent;
  let fixture: ComponentFixture<ConteneursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConteneursComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
