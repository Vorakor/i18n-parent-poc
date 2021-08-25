import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'used',
  templateUrl: './used.component.html',
  styleUrls: ['./used.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
