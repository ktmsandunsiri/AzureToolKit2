import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user-service.service';
import { User } from '../common/models/user';
import { AzureToolkitService } from '../common/services/azure-toolkit.service';
import { SavedImage } from '../common/models/savedImage';

@Component({
  selector: 'app-galary',
  templateUrl: './galary.component.html',
  styleUrls: ['./galary.component.css']
})
export class GalaryComponent implements OnInit {
  user: User;
  savedImages: SavedImage[] | null = null;
  searchResults: SavedImage[] | null;
  
  constructor(private userService: UserService, private azureToolkitService: AzureToolkitService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user
      this.azureToolkitService.getImages(this.user.userId).subscribe(images => {
        this.savedImages = images;
    })
    } );

    // this.user = new User();
    // this.user.firstName = "thilina";
    // this.user.lastName = "sandunsiri";
    // this.user.userId = "20";
    //       this.azureToolkitService.getImages(this.user.userId).subscribe(images => {
    //     this.savedImages = images;
    // })
  }

  search(searchTerm: string) {
    this.searchResults = null;

    this.azureToolkitService.searchImage(this.user.userId, searchTerm).subscribe(result => {
        this.searchResults = result;
    });
}

}
