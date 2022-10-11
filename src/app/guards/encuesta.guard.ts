import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EncuestaService } from '../shared/encuesta.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaGuard implements CanActivate {

  acceso : boolean = false;

  constructor(private encuestaService : EncuestaService) {
    this.encuestaService.getEncuesta().then(res => {
      this.acceso = res == null;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.acceso;
  }
  
}
