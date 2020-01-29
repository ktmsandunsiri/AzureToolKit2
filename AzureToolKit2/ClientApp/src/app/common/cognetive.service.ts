import { Injectable } from '@angular/core';
import { AzureHttpClientService } from './azure-http-client.service';
import { Observable } from 'rxjs/Observable';
import { BingSearchResponse } from './models/bingSearchResponse';
import { map, catchError, } from 'rxjs/operators';
import { ComputerVisionResponse, ComputerVisionRequest } from './models/computerVisionResponse';
//import { ComputerVisionRequest, ComputerVisionResponse } from '../models/computerVisionResponse';

@Injectable()
export class CognetiveService {
  bingSearchAPIKey = '1e38b9d2956348abbc7dbcc5bd267de7';
  computerVisionAPIKey = 'b5a52825bc87487e890c67e264c355e5';

  bingSearchURL = 'https://imagesearchldz.cognitiveservices.azure.com/bing/v7.0/images/search';
  constructor(private http: AzureHttpClientService) { }

  searchImages(searchTerm: string): Observable<BingSearchResponse> {
    // return this.http.get('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${searchTerm}', this.bingSearchAPIKey)
    return this.http.get(this.bingSearchURL + '?q=' + searchTerm, this.bingSearchAPIKey)
    .pipe(map(response =>{
      return response.json() as BingSearchResponse
    },catchError(this.handleError)))
    
  }

  analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {
    return this.http.post('https://centralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags', this.computerVisionAPIKey, request)
    .pipe(map(response =>{
      return response.json() as ComputerVisionResponse
    },catchError(this.handleError)))
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}
}
