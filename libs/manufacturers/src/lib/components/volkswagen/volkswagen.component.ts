import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'volkswagen',
  templateUrl: './volkswagen.component.html',
  styleUrls: ['./volkswagen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolkswagenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
