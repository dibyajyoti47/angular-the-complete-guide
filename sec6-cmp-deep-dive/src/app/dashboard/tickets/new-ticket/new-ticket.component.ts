import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, output, viewChild, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-ticket',
    standalone: true,
    templateUrl: './new-ticket.component.html',
    styleUrl: './new-ticket.component.css',
    imports: [ButtonComponent, ControlComponent, FormsModule]
})
export class NewTicketComponent implements AfterViewInit, OnInit {

    @ViewChild("ticketForm") ticketForm?: ElementRef<HTMLFormElement>;
    // private ticketForm = viewChild.required<ElementRef<HTMLFormElement>>("ticketForm");
    add = output<{title: string; text: string}> ();
    enteredTitle = "";
    enteredText = "";

    ngOnInit(): void {
        console.log("on init");
        console.log(this.ticketForm?.nativeElement);
    }

    ngAfterViewInit(): void {
        console.log("After View Init");
        console.log(this.ticketForm?.nativeElement);
    }

    public onSubmit() {
        // console.log(titleElement.value + " received ");
        // console.log(rqstText.value + " received ");
        // this.ticketForm.nativeElement.reset();
        this.add.emit({title: this.enteredTitle, text: this.enteredText});
        this.ticketForm?.nativeElement.reset();
        this.enteredText = "";
        this.enteredTitle = "";
    }
}
