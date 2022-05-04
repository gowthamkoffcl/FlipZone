import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: any;
  constructor() {}

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentuser'));
  }
}
