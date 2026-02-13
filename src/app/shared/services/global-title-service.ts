import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalTitleService {

  private _activeRoute = inject(ActivatedRoute);


  private _title = signal('')

  activatedRoute: ActivatedRoute | undefined;



  public get activeTitle() : string {
    return this.activatedRoute?.snapshot.title || 'NotDefined'
  }



  public get globalTitle() : string {
    return this._title();
  }

  setTitle(title:string   | undefined ){
    this._title.set ( title ? title : 'NotDefined' );
  }

  setTitleByRoute(){
    this.setTitle( this._activeRoute.snapshot.title )
  }


  setTitleByActiveRoute(actRoute: ActivatedRoute){
    this.setTitle( actRoute.snapshot.title )
  }
}
