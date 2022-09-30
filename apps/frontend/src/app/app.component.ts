import { Component } from '@angular/core';
import { LocalStorageService, LocalStorageVars } from '@igikanam/local-storage';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'igikanam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  loggedInCheckInterval!: number;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    // Set logged in status
    this.isLoggedIn =
      this.localStorageService.getItem(LocalStorageVars.accessTokenInfo)
        ?.value != null;
    // periodically check the logged in status.
    // I technically could subscribe to local storage but angular strict rules are making it n annoying process so I went with this meh approach.
    this.loggedInCheckInterval = window.setInterval(() => {
      this.updateAccessInfo();
    }, 2500);
  }

  /**
   * Update isLoggedIn and role variables based on the access token info.
   */
  updateAccessInfo(): void {
    this.isLoggedIn =
      this.localStorageService.getItem(LocalStorageVars.accessTokenInfo)
        ?.value != null;
  }

  logout(): void {
    this.authService.logout();
  }
}
