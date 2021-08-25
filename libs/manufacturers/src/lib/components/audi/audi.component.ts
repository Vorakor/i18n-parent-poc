import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'audi',
  templateUrl: './audi.component.html',
  styleUrls: ['./audi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
