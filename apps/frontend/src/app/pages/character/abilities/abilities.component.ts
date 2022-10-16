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
  abilities: ISpecialAbility[] = [];
  selected: ISpecialAbility[] = [];
  available: ISpecialAbility[] = [];
  unavailable: ISpecialAbility[] = [];
  displayedColumns: string[] = ['name', 'category', 'ap', 'actions'];

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
        this.initLists();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  initLists(): void {
    this.available = this.abilities.filter(
      (item) => !this.selected.includes(item)
    );
    this.selected = [...this.selected]; // trigger change detection by creating a new array reference
  }

  select(ability: ISpecialAbility): void {
    this.selected.push(ability);
    this.initLists();
  }

  remove(ability: ISpecialAbility): void {
    this.selected = this.selected.filter((item) => item !== ability);
    this.initLists();
  }
}
