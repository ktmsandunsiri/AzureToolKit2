import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CognetiveService } from './cognetive.service';
import { AzureHttpClientService } from './azure-http-client.service';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user-service.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers : [CognetiveService, AzureHttpClientService, UserService]
})
export class CommonSearchModule { }
