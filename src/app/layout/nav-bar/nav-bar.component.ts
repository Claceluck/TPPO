import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  currentComponent: string = 'home';

  constructor() {}

  ngOnInit(): void {}

  trigger(component: string): void {
    this.currentComponent = component;
  }
}
