import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppService', () => {
  let service:AppService;
  let appServiceSpy: { get: jasmine.Spy,delete: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AppService]
    })
    appServiceSpy = jasmine.createSpyObj('HttpClient', ['get','delete','put','post']);
    service = new AppService(appServiceSpy as any);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should set username', inject([AppService], (service: AppService) => {
    service.setUsername('username');
    expect(service.username).toEqual('username');
  }));

  it('should return expected teams',()=>{
    const expectedTeams:any[]=[
      {
        "id": 1,
        "teamNameName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      }
    ];

    appServiceSpy.get.and.returnValue(of(expectedTeams))

    service.getTeams().subscribe(
      teams => expect(teams).toEqual(expectedTeams, 'expected teams'),
      fail
    );
    expect(appServiceSpy.get.calls.count()).toBe(1, 'one call');
  })

  it('should return expected members',()=>{
    const expectedMembers:any[]=[
      {
        "firstName": "Jeb",
        "lastName": "Jackson",
        "jobTitle": "Reserve Driver",
        "status": "Inactive",
        "team": "Formula 2 - Car 63",
        "id": 3
      },
      {
        "firstName": "franko",
        "lastName": "sit",
        "jobTitle": "Job Titile",
        "status": "Inactive",
        "team": "Formula 1 - Car 8",
        "id": 4
      },
    ];

    appServiceSpy.get.and.returnValue(of(expectedMembers))

    service.getMembers().subscribe(
      teams => expect(teams).toEqual(expectedMembers, 'expected members'),
      fail
    );
    expect(appServiceSpy.get.calls.count()).toBe(1, 'one call');
  }); 
});

describe('AppService Add,Update,Delete', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: AppService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AppService);
  });

  it('Should addMember', () => {
    const mockMember = {
      "firstName": "Jeb",
      "lastName": "Jackson",
      "jobTitle": "Reserve Driver",
      "status": "Inactive",
      "team": "Formula 2 - Car 63",
      "id": 3
    };

    service.addMember(mockMember)
      .subscribe(member => {
        expect(member.firstName).toEqual('Jeb');
      });

    const req = httpTestingController.expectOne('http://localhost:8000/api/addMember');

    expect(req.request.method).toEqual('POST');

    req.flush(mockMember);
  });

  it('Should updateMember', () => {
    const mockMember = {
      "firstName": "Jeb",
      "lastName": "Jackson",
      "jobTitle": "Reserve Driver",
      "status": "Inactive",
      "team": "Formula 2 - Car 63",
      "id": 3
    };

    service.updateMember(3,mockMember)
      .subscribe(member => {
        expect(member.id).toEqual(3);
      });

    const req = httpTestingController.expectOne('http://localhost:8000/api/updateMember/3');

    expect(req.request.method).toEqual('PUT');

    req.flush(mockMember);
  });

  it('Should deleteMember', () => {
    
    service.deleteMember(3)
      .subscribe(() => {
      });

    const req = httpTestingController.expectOne('http://localhost:8000/api/deleteMember/3');

    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
