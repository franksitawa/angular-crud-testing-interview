import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import {ROUTES} from '../app.module'

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let service:AppService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent
      ],
      imports: [HttpClientModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        AppService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
