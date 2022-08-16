import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models/user.model';
import { appPaths } from '../configs/appPaths';
import { AppPaths } from '../shared/appPaths.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public paths: AppPaths = appPaths;
  public isAuthenticated = false;
  private authSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
    });
  }

  public onSaveData():void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData():void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public onLogout() {
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
