import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberModel: Member;
  memberID:number;
  memberForm: FormGroup=this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    status: ['', Validators.required],
    team: ['', Validators.required],
  });;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router,private route:ActivatedRoute) {
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
  }

  ngOnInit() {
    this.route.paramMap.pipe(map(paramMap=>
      paramMap.get('id')
    )).subscribe((id)=>{
      this.memberID=parseInt(id)||0;
      if(this.memberID>0){
        this.appService.getMember(id).subscribe(member=>{
          this.memberModel=member;
          this.memberForm.patchValue(this.memberModel);
        })
      }
    });
  }


  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if(this.memberID>0){
      this.appService.updateMember(this.memberID,this.memberModel).subscribe(res => this.router.navigateByUrl('/members'));
    }else{
      this.appService.addMember(this.memberModel).subscribe(res => this.router.navigateByUrl('/members'));
    }
    
  }
}
