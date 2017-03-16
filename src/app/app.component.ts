import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edit Launcher Configuration';
  quoteString = '&quot;';
  bracketOpen = '{';
  bracketClose = '}';
  disableAppsButton = false;
  hideGoogleSearchBar = false
  appFilterList = [];
  appToAdd = '';
  resArea = [
    [ false, false, false, false],
    [ false, false, false, false],
    [ false, false, false, false],
    [ false, false, false, false],
  ];
  resHotSeat = [ false, false, false, false, false ]

  onKey(event: any) { // without type info
    this.appFilterList.push(this.appToAdd)
    this.appToAdd = ''
  }
  onRemoveApp(app: string): void {
      const index = this.appFilterList.indexOf(app);
      this.appFilterList.splice(index, 1);
  }
}
