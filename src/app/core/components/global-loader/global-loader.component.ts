import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalLoaderService } from '../../services/global-loader.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { IGlobalLoaderState } from '../../interfaces/iGlobalLoaderState';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {
  public show = false;
  private subscription: Subscription;

  constructor(private loaderService: GlobalLoaderService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: IGlobalLoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
