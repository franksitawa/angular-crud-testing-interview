import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'softrams-racing';

  constructor(private appService: AppService,private router:Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if((event.url=='/') || (event.url=='/login')){
          localStorage.clear();
          this.initStorage();
        }else{
          if(!localStorage.getItem('username')){
            this.router.navigate(['/login']);
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.initStorage()
  }

  initStorage(): void {
    if (!this.appService.username || this.appService.username.length < 1) {
      this.appService.setUsername(localStorage.getItem('username'));
    }
  }
}
