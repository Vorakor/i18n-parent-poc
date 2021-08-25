import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cricuti18n-parent-poc-test2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.get('MAIN.TITLE').subscribe((results: string) => {
      console.log(results);
    });
  }
}
