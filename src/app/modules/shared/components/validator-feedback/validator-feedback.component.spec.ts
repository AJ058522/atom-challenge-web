import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ValidatorFeedbackComponent } from "./validator-feedback.component";

describe("ValidatorFeedbackComponent", () => {
    let component: ValidatorFeedbackComponent;
    let fixture: ComponentFixture<ValidatorFeedbackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ValidatorFeedbackComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ValidatorFeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
