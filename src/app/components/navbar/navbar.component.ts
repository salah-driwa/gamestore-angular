import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router){

  }
  onSubmit(form:NgForm){
    this.router.navigate(['search', form.value.search])
    window.scrollTo({ top:750, behavior: 'smooth' });
    }

}
