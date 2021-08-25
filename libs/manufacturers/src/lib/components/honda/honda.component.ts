import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'honda',
  templateUrl: './honda.component.html',
  styleUrls: ['./honda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HondaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
