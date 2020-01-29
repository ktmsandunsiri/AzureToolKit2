import { Component, OnInit } from '@angular/core';
import { ImageResult } from '../common/models/bingSearchResponse';
import { CognetiveService } from '../common/cognetive.service';
import { ComputerVisionResponse, ComputerVisionRequest } from '../common/models/computerVisionResponse';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults : ImageResult[] | null;
  isSearching = false;

  currentAnalytics: ComputerVisionResponse | null;
  currentItem: ImageResult | null;
  isAnalyzing = false;

  constructor(private cognitiveService: CognetiveService) { }

  ngOnInit() {
  }
  search(searchTerm: string) {
    this.searchResults = null;
    this.currentAnalytics = null;
    this.isSearching = true;
    this.cognitiveService.searchImages(searchTerm)
    .subscribe(result => {
      this.searchResults = result.value;
      this.isSearching = false;
    })
  }

  analyze(result: ImageResult) {
    this.currentItem = result;
    this.currentAnalytics = null;
    this.isAnalyzing = true;
    this.cognitiveService.analyzeImage({url : result.thumbnailUrl} as ComputerVisionRequest)
    .subscribe(response => {
      this.currentAnalytics = response;
      this.isAnalyzing = false;
    });
    window.scroll(0,0);
  }
}
