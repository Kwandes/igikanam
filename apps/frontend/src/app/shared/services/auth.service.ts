import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
  ISignupResponse,
} from '@igikanam/interfaces';
import { LocalStorageService, LocalStorageVars } from '@igikanam/local-storage';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  /**
   * Perform a login request to the API
   * @param params user credentials
   * @returns observable of the API request
   */
  login(params: ILoginRequest): Observable<ILoginResponse> {
    const { email, password } = params;
    return this.http.post<ILoginResponse>(
      `${env.apiUrl}/auth/login`,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  /**
   * Perform a signup/registration request to the API
   * @param params user credentials
   * @returns observable of the API request
   */
  register(params: ISignupRequest): Observable<ISignupResponse> {
    // Remove null and undefined values
    params = JSON.parse(JSON.stringify(params));

    return this.http.post<ISignupResponse>(
      `${env.apiUrl}/auth/signup`,
      params,
      httpOptions
    );
  }

  /**
   * Remove the logged in user information from local storage and API
   */
  public logout(): void {
    this.localStorageService.removeItem(LocalStorageVars.accessTokenInfo);
    this.router.navigate(['/login']);
  }

  /**
   * Save access information to local storage
   * @param accessInfo information used for authentication like the access token.
   */
  public saveAccessInfo(accessInfo: ILoginResponse): void {
    this.localStorageService.removeItem(LocalStorageVars.accessTokenInfo);
    this.localStorageService.setItem<ILoginResponse>(
      LocalStorageVars.accessTokenInfo,
      accessInfo
    );
  }

  /**
   * Get user information for authentication. The data comes from local storage.
   * @returns user information needed for authentication and authorization. Returns null if no information is found.
   */
  public getAccessInfo(): ILoginResponse | null {
    const user = this.localStorageService.getItem<ILoginResponse>(
      LocalStorageVars.accessTokenInfo
    );
    if (user) {
      return user.getValue();
    }
    return null;
  }

  /**
   * Delete specific account.
   * @param id id of the account.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/auth/${id}`);
  }
}
