import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
/* Set the width of the side navigation to 250px */
 openNav() {
  document.getElementById("mySidenav")!.style.width = "100%";
}

/* Set the width of the side navigation to 0 */
 closeNav() {
  document.getElementById("mySidenav")!.style.width = "0";
}
}
