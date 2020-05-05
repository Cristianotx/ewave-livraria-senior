import { Injectable } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  options: GlobalConfig;

  constructor(private toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.preventDuplicates = true;
    this.options.countDuplicates = true;
    this.options.newestOnTop = true;
    this.options.progressBar = true;
    this.options.closeButton = true;
    this.options.enableHtml = true;
  }

  showSuccessMessage(title, message, life: number = 5000) {
    this.options.timeOut = life;
    this.toastrService.success(message, title, this.options);
  }

  showWarningMessage(title, message, life: number = 5000) {
    this.options.timeOut = life;
    this.toastrService.warning(message, title, this.options);
  }

  showInfoMessage(title, message, life: number = 5000) {
    this.options.timeOut = life;
    this.toastrService.info(message, title, this.options);
  }

  showErrorMessage(title, message, life: number = 5000) {
    this.options.timeOut = life;
    this.toastrService.error(message, title, this.options);
  }
}
