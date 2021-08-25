import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'acura',
  templateUrl: './acura.component.html',
  styleUrls: ['./acura.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcuraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
