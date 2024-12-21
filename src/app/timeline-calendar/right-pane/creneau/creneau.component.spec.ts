import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KesyTimelineCreneauComponent } from './creneau.component';

describe('KesyTimelineCreneauComponent', () => {
  let component: KesyTimelineCreneauComponent;
  let fixture: ComponentFixture<KesyTimelineCreneauComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KesyTimelineCreneauComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KesyTimelineCreneauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
