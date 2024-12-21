import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KesyLeftPaneItemComponent } from './item.component';

describe('KesyLeftPaneItemComponent', () => {
  let component: KesyLeftPaneItemComponent;
  let fixture: ComponentFixture<KesyLeftPaneItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KesyLeftPaneItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KesyLeftPaneItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
