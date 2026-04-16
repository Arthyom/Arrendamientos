import { Directive, OnInit } from "@angular/core";
import { GlobalTitleService } from "../../shared/services/global-title-service";
import { ActivatedRoute } from "@angular/router";


@Directive()
export abstract class BasePage implements OnInit{

  /**
   *
   */
  constructor(
    public _titleService: GlobalTitleService,
    private _activeRoute : ActivatedRoute
  ) {
    this._titleService.activatedRoute = _activeRoute

  }

  ngOnInit(): void {
    this._titleService.setTitle(this._activeRoute.snapshot.title );
  }

}
