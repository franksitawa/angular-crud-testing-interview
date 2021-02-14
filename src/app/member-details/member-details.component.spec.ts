import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES } from '../app.module';
import { MembersComponent } from '../members/members.component';
import { LoginComponent } from '../login/login.component';
import { BannerComponent } from '../banner/banner.component';
import { AppComponent } from '../app.component';
import { APP_BASE_HREF, Location } from '@angular/common';

// Bonus points!
describe('MemberDetailsComponent- Navigate to Update Member', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,MemberDetailsComponent,MembersComponent,LoginComponent, BannerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [
        HttpClient,
        FormBuilder,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue:{
            paramMap: of(
              {
                 get:(param)=>{
                    switch(param){
                      case 'id':
                        return '3';
                    }
                 }
                
              }
            )
          }
          
          
      },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    
    httpTestingController = TestBed.get(HttpTestingController);
    location = TestBed.get(Location); 
    router = TestBed.get(Router);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have memberID as 3',()=>{
    expect(component.memberID).toEqual(3);  
  });
  it('should render Update Member to Racing Team as title',()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Update Member to Racing Team'); 
  });
  it('form invalid when empty', () => {
    expect(component.memberForm.valid).toBeFalsy();
  });

  it('ensure for form PUTs data when its an existing member', () => {
    const mockMember = {
      "firstName": "Jeb",
      "lastName": "Jackson",
      "jobTitle": "Reserve Driver",
      "status": "Inactive",
      "team": "Formula 2 - Car 63",
      "id":"3"
    };
    component.memberForm.patchValue(mockMember);
    component.onSubmit(component.memberForm);
    const req = httpTestingController.expectOne('http://localhost:8000/api/updateMember/3');
    expect(req.request.method).toEqual('PUT');
    
    req.flush(mockMember);
  });
});

describe('MemberDetailsComponent- Navigate to Create Member', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,MemberDetailsComponent,MembersComponent,LoginComponent, BannerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [
        HttpClient,
        FormBuilder,
        
        {
          provide: ActivatedRoute,
          useValue:{
            paramMap: of(
              {
                 get:(param)=>{
                    switch(param){
                      case 'id':
                        return '';
                    }
                 }
                
              }
            )
          }
          
          
      },
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();;
    httpTestingController = TestBed.get(HttpTestingController);
    location = TestBed.get(Location); 
    router = TestBed.get(Router);
    
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have memberID as 0',()=>{
    expect(component.memberID).toEqual(0);  
  });
  it('should render Add Member to Racing Team as title',()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Add Member to Racing Team'); 
  });
  it('form invalid when empty', () => {
    expect(component.memberForm.valid).toBeFalsy();
  });
  
  it('ensure for form POSTs data when its a new member', () => {
    const mockMember = {
      "firstName": "Jeb",
      "lastName": "Jackson",
      "jobTitle": "Reserve Driver",
      "status": "Inactive",
      "team": "Formula 2 - Car 63",
    };
    component.memberForm.patchValue(mockMember);
    component.onSubmit(component.memberForm);
    const req = httpTestingController.expectOne('http://localhost:8000/api/addMember');
    expect(req.request.method).toEqual('POST');
    
    req.flush(mockMember);
  });
});
