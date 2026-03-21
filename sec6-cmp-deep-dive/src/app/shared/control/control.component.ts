import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, HostListener, ViewEncapsulation, afterNextRender, afterRender, inject, input } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None ,
  host: {
    class: "control",
    "(click)": "onClick()"
  }
})
export class ControlComponent implements AfterContentInit {

  constructor() {
    afterRender(() => {
      console.log("AfterRender")
    });
    afterNextRender(() => {
      console.log("afterNextRender");
    });
  }

  // @HostBinding("class") className = "control";
  //  @HostListener("click") onClick() {
  //   console.log("Clicked!");
  // }
  label = input.required<string>();
  private el = inject(ElementRef);
  @ContentChild("inputForContentChild") private control?: ElementRef<HTMLFormElement> | HTMLTextAreaElement;
  onClick() {
    console.log("Clicked!");
    console.log(this.el);
    console.log(this.control);
  }

  ngAfterContentInit(): void {
    
  }
}
