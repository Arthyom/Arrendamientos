import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppOpStateService {

  private _hasError: boolean = false;
  private _hasSuccess: boolean = false;

  private _showAnyNotification: boolean = false;

  get hasError(): boolean {
    return this._hasError;
  }

  get hasSuccess(): boolean {
    return this._hasSuccess;
  }

  get showAnyNotification(): boolean {
    return this._showAnyNotification;
  }

  setErrorState(state: boolean) {
    this._hasError = state;
    setTimeout(() => { this._hasError = false}, 5000);
  }

  setSuccessState(state: boolean) {
    this._hasSuccess = state;
    setTimeout(() => { this._hasSuccess = false}, 5000);

  }

  setShowAnyNotification(state: boolean) {
    this._showAnyNotification = state;
    setTimeout(() => { this._showAnyNotification = false}, 5000);
  }

}
