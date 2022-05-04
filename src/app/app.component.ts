import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'flipzone';
  users = [
    { username: 'gowtham', password: '123456' },
    { username: 'kumar', password: '123456' },
    { username: 'mani', password: '123456' },
    { username: 'sathish', password: '123456' },
  ];
  link: string = '';

  constructor(private router: Router, private activatedroute: ActivatedRoute) {
    this.router.events.subscribe((res) => {
      this.link = this.router.url.toString();
      this.showHeader();
    });
  }

  ngOnInit(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  showHeader() {
    if (
      this.link != '/' &&
      this.link != '/signin' &&
      this.link != '/register' &&
      this.link != '/forgot-password'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
