import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-similargamecard',
  templateUrl: './similargamecard.component.html',
  styleUrls: ['./similargamecard.component.css']
})
export class SimilargamecardComponent {
  @Input() game: Game | undefined;



 
  constructor( public router: Router) { }

  ngOnInit(): void {
  }





  openGamecardDetail(id:string, event: MouseEvent):void{
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    if (this.router) {
      if (isCtrlPressed) {
        // Open in a new tab
        window.open(`/details/${id}`, '_blank');
      } else {
        // Open normally
        this.router.navigate(['/details', id]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
   
  
}
}
