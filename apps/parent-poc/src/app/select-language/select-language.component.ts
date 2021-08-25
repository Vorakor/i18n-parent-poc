import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sel-lang',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent implements OnInit {
    @Input() languages: string[] = [];
    constructor(public translate: TranslateService) {}

    ngOnInit(): void {}

    setLang(event: any) {
        this.translate.use(event.target.value);
    }
}
