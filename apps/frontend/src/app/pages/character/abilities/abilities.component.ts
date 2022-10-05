import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ISpecialAbility } from '@igikanam/interfaces';
import { AbilitiesService } from '../../../shared/services/abilities.service';

@Component({
  selector: 'igikanam-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.css'],
})
export class AbilitiesComponent implements OnInit {
  abilities?: ISpecialAbility[];

  isLoading = false;

  constructor(private abilitiesService: AbilitiesService) {}

  ngOnInit(): void {
    this.fetchAbilities();
  }

  fetchAbilities(): void {
    this.isLoading = true;
    this.abilitiesService.get().subscribe({
      next: (response) => {
        this.abilities = response;
        this.isLoading = false;
        console.log('abilities ', this.abilities);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }
}
