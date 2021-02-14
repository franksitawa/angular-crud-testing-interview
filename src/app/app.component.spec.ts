import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { APP_BASE_HREF, Location } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES } from './app.module';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';


describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let service:AppService;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,MemberDetailsComponent,MembersComponent,LoginComponent, BannerComponent],
      imports: [RouterTestingModule.withRoutes(ROUTES), HttpClientTestingModule,ReactiveFormsModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 
    service = TestBed.get(AppService);
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'softrams-racing'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('softrams-racing');
  }));

  it('navigate to "" redirects you to /login', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/login'); 
  }));

  it('navigate to "/members" redirects you to /login when username is not set', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    router.navigate(['/members']); 
    tick(); 
    expect(location.path()).toBe('/login'); 
  }));
});
