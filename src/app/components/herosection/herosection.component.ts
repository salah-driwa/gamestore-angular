import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Stores } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HerosectionComponent {
  public stores: Array<Stores> | undefined;
  private routeSub: Subscription= new Subscription();
  private gameSub: Subscription = new Subscription();

  constructor(private httpService: HttpService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
    
      this.stores=[];
  
     // Initialize with an empty string or an appropriate default value
  
   
     }
   public currentindex= 0;

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.getstores();
    })}
  

getstores(): void {
  // Construct the API request based on the selected options
  this.gameSub = this.httpService
    .getstores()
    .subscribe((storesList: APIResponse<Stores>) => {
      this.stores = storesList.results;
      console.log( this.stores)
    });
}
setindex( i :any){
  this.currentindex =i ;
  console.log(this.currentindex)
}
}
