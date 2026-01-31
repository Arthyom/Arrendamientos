import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfiniteLoaderService {

  showLoader = signal(true);

}
