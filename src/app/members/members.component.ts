import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.loadMembers()
  }
  loadMembers(){
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigateByUrl('/add-member')
  }


  editMemberByID(id: number) {
    this.router.navigateByUrl('/edit-member/'+id)
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(()=>this.loadMembers());
  }
}
