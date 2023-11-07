import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,throwError as observableThrowError  } from "rxjs";

@Injectable()
    export class HttpheaderInterceptor implements HttpInterceptor {
        constructor(){

        }
        intercept(req: HttpRequest<any>
            , next: HttpHandler
            ): Observable<HttpEvent<any>> {
                 req= req.clone({
                  
                    setParams:{
                        key: 'ecee3adb1c3049cebb1196688e80d6f3',
                    }
                 });
                 return next.handle(req);    
            
        }


    }
