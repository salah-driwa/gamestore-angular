import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { APIResponse, Stores } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { CommonModule } from '@angular/common';
import { animate, query, style, transition, trigger ,stagger  } from '@angular/animations';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(':self', [style({ opacity: 0, transform: 'translateX(-20px)' })]),
        query(':self', [
          stagger('0.2s', animate('1.5s linear', style({ opacity: 1, transform: 'translateX(0)' }))),
        ]),
      ]),
    ]),
  ],
  
})

  
export class HerosectionComponent {
  public stores: Array<Stores> | undefined;
  private routeSub: Subscription= new Subscription();
  private gameSub: Subscription = new Subscription();
  public shouldFadeIn: boolean = false;
  constructor(private httpService: HttpService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    
      this.stores=[];
  
     // Initialize with an empty string or an appropriate default value
  
     const indexIncrementer = interval(4000).subscribe(() => {
      this.currentindex = (this.currentindex + 1) % 5; // Reset to 0 if it exceeds 4
    });
     }
   public currentindex= 0;

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.shouldFadeIn = true; 
      this.getstores();
    })}
  
    openStoreUrl(domain: string): void {
      // Construct the full URL
      const fullUrl = 'http://' + domain;
    
      // Open the store URL in a new window/tab
      window.open(fullUrl, '_blank');
    }
    
getstores(): void {
  // Construct the API request based on the selected options
  this.gameSub = this.httpService
    .getstores()
    .subscribe((storesList: APIResponse<Stores>) => {
      this.stores = storesList.results;
     
    });
}
setindex( i :any){
  this.currentindex =i ;
 
}
}
