import { Component, OnInit } from '@angular/core';
import { ImageResult, ImagePostRequest } from '../common/models/bingSearchResponse';
import { CognetiveService } from '../common/cognetive.service';
import { ComputerVisionResponse, ComputerVisionRequest } from '../common/models/computerVisionResponse';
import { AzureToolkitService } from '../common/services/azure-toolkit.service';
import { UserService } from '../common/services/user-service.service';
import { User } from '../common/models/user';


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
  currentItemSaved: boolean;
  user: User;

  constructor(private cognitiveService: CognetiveService,private userService: UserService, private azureToolkitService: AzureToolkitService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user );
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
    this.currentItemSaved = false;
    this.isAnalyzing = true;
    this.cognitiveService.analyzeImage({url : result.thumbnailUrl} as ComputerVisionRequest)
    .subscribe(response => {
      this.currentAnalytics = response;
      this.isAnalyzing = false;
    });
    window.scroll(0,0);
  }

  saveImage() {
let transferObject : ImagePostRequest  = {
             userId: this.user.userId,
             url: this.currentItem.thumbnailUrl,
             encodingFormat: this.currentItem.encodingFormat,
             id: this.currentItem.imageId,
             description: this.currentAnalytics.description.captions[0].text,
             tags: this.currentAnalytics.tags.map(tag => tag.name)
         }
    this.azureToolkitService.saveImage(transferObject).subscribe(saveSuccessful => {
        this.currentItemSaved = saveSuccessful;
    });
}
}
