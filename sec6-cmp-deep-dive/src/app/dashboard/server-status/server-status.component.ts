import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  // currentStatus: "online" | "offline" | "unknown" = 'offline';
  currentStatus = signal<"online" | "offline" | "unknown" | 'offline'>("offline");


  constructor() {  
    effect(( )=> {
      console.log(this.currentStatus());
    });
  }
  
  private interval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    setInterval(() => {
      const random = Math.random();
      if(random <0.5)
        // this.currentStatus = "online"
        this.currentStatus.set("online");
      else if (random < 0.9) 
        // this.currentStatus = "online"
        this.currentStatus.set("offline");
      else
        // this.currentStatus = "unknown"
        this.currentStatus.set("unknown");    
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
