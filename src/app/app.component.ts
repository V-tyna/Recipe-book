import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentFeature: string = 'recipes';

  public navigateTo(type: string) {
    this.currentFeature = type;
  }
}
