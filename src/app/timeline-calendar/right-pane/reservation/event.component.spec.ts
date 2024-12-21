import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {KesyTimelineEventComponent} from "./event.component";


describe('KesyTimelineEventComponent', () => {
    let component: KesyTimelineEventComponent;
    let fixture: ComponentFixture<KesyTimelineEventComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [KesyTimelineEventComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(KesyTimelineEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
