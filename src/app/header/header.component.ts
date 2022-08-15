import { Component } from '@angular/core';
import { appPaths } from '../configs/appPaths';
import { AppPaths } from '../shared/appPaths.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent {
  public paths: AppPaths = appPaths;

  constructor(private dataStorageService: DataStorageService) {}

  public onSaveData():void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData():void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
