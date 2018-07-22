import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css']
})
export class DurationInputComponent implements OnInit {
  @Input() public durationInput: number;
  constructor() { }

  ngOnInit() {
  }

}
