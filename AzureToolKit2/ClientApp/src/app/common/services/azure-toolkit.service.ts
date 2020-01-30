import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AzureToolkitService {

     private originUrl: string;

     constructor(private http: Http, @Inject('ORIGIN_URL')originUrl: string) {
         this.originUrl = originUrl;
     }

     public saveImage(imagePostRequest: { url: string, id: string, encodingFormat: string}): Observable<boolean> {
      return this.http.post(this.originUrl+'/api/images', imagePostRequest)
      .pipe(map(response => {
        return response.ok;
      }))
      .pipe(catchError(this.handleError))

  }
     private handleError(error: any): Promise<any> {
         console.error('An error occurred', error); // for demo purposes only
         return Promise.reject(error.message || error);
     }

}