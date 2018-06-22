import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.css']
})
export class LoadMoreBtnComponent implements OnInit {
  public isLoading = false;
  constructor() { }

  ngOnInit() {
  }

  loadData(): boolean {
    if (this.isLoading) {
      return false;
    }
    this.isLoading = true;
    console.log(`Waiting for items... (3 seconds)`);

    setTimeout(() => {
      console.log(`Items loaded!`);
      this.isLoading = false;
    }, 3000);

    return false;
  }
}
