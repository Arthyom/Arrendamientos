import { ActivatedRoute } from "@angular/router";
import { InfiniteLoaderService } from "../../../shared/services/infinite-loader-service";
import { AppOpStateService } from "../../shared/services/app-op-state";
import { ServiceArrDataRequester } from "../../shared/services/service-arr-data-requester";
import { ServiceFacedeForm } from "../../shared/services/service-facede-form";
import { Propiedad } from "../Entities/propiedad";
import { IBaseComponent } from "./IBaseComponent";

import { JsonPipe, Location } from '@angular/common';
import { Directive, OnDestroy, OnInit } from "@angular/core";

@Directive()
export abstract class BaseComponent<Tin> implements OnInit, OnDestroy {

  /**
   *
   */
  constructor(
    protected _router: ActivatedRoute,
    protected _location: Location,
    protected _inf: InfiniteLoaderService,
    protected _service: ServiceArrDataRequester,
    protected _stateService: AppOpStateService,
    public formService: ServiceFacedeForm<Tin>,
    public resource: string,
  ) {

    this.formService.setInjectors(
      this._router,
      this._location,
      this._inf,
      this._service,
      this._stateService,
      this.resource,
    );

  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }




}
