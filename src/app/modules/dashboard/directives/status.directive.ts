import {
    Directive, ElementRef, Input, OnChanges, SimpleChanges
} from "@angular/core";

@Directive({
    selector: "[appStatus]",
    standalone: true
})
export class StatusDirective implements OnChanges {
    @Input() appStatusColor: string | undefined;

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["appStatusColor"]) {
            this.setStatusColor();
        }
    }

    private setStatusColor() {
        this.el.nativeElement.style.color = "#ffffff";
        this.el.nativeElement.style.padding = "4px";
        this.el.nativeElement.style.paddingLeft = "8px";
        this.el.nativeElement.style.paddingRight = "8px";
        this.el.nativeElement.style.borderRadius = "50px";

        switch (this.appStatusColor?.toLowerCase()) {
            case "pending":
                this.el.nativeElement.style.backgroundColor = "#dc3545";
                break;
            case "completed":
                this.el.nativeElement.style.backgroundColor = "#28a745";
                break;
            default:
                this.el.nativeElement.style.backgroundColor = "#dc3545";
        }
    }
}
