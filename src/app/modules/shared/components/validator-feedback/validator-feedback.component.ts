import {
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "app-validator-feedback",
    templateUrl: "./validator-feedback.component.html",
    styleUrls: ["./validator-feedback.component.css"],
    standalone: true,
})
export class ValidatorFeedbackComponent implements OnInit, OnChanges {
    @Input() control: AbstractControl | null | undefined = null;
    @Input() patternText: string | null = null;
    @Input() color: string | null = "";
    @Input() fontWeight: string | null = "";
    @Input() customMessage: string | undefined;
    @HostBinding("style.--fontColor") fontColor: string | null = "";
    @HostBinding("style.--fontW") fontW: string | null = "normal";

    ngOnInit(): void {
        this.fontColor = this.color;
        this.fontW = this.fontWeight;
    }

    ngOnChanges(changes: SimpleChanges): void {}
}
