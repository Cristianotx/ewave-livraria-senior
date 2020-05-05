import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/shared/base/service/loading.service';

@Component({
  selector: 'app-loading',
  template: '<div class="loading" *ngIf="isLoading"><img src="./../../../../assets/img/loading.svg"/></div>',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading = false;
  subscription: Subscription;
  count = 0;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscribeToNotifications();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeToNotifications() {
    this.subscription = this.loadingService.loadingChange.subscribe((isLoading) => {
      if (isLoading) {
        this.count++;
        this.isLoading = true;
      } else {
        this.count--;
      }
      if (this.count === 0) {
        setTimeout(() => (this.isLoading = false), 500);
      }
    });
  }
}
