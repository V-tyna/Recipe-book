import { Component } from '@angular/core';
import { appPaths } from '../configs/appPaths';
import { AppPaths } from '../shared/appPaths.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent {
  public paths: AppPaths = appPaths;
}
