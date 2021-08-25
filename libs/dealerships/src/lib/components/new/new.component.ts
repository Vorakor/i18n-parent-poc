import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
