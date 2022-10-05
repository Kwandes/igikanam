import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateSpecialAbilityRequest,
  ISpecialAbility,
} from '@igikanam/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AbilitiesService {
  constructor(private http: HttpClient) {}

  /**
   * Calls the API to fetch all available abilities.
   *
   * @returns an observable with the list of abilities.
   */
  public get(): Observable<ISpecialAbility[]> {
    return this.http.get<ISpecialAbility[]>(
      `${env.apiUrl}/special-abilities/me`
    );
  }

  /**
   * Calls the API to fetch a ability by ID.
   *
   * @param id - the ID of the ability.
   * @returns an observable with the requested ability.
   */
  public getById(id: string): Observable<ISpecialAbility> {
    return this.http.get<ISpecialAbility>(
      `${env.apiUrl}/special-abilities/${id}/id`
    );
  }

  /**
   * Calls the API to create a ability.
   *
   * @param params - a create ability request with all the needed info.
   * @returns an observable with created ability.
   */
  public create(
    params: CreateSpecialAbilityRequest
  ): Observable<ISpecialAbility> {
    return this.http.post<ISpecialAbility>(
      `${env.apiUrl}/special-abilities`,
      params
    );
  }
}
