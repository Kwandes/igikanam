import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { AbilitiesComponent } from './pages/character/abilities/abilities.component';
import { AdvantagesDisadvantagesComponent } from './pages/character/advantages-disadvantages/advantages-disadvantages.component';
import { AttributesComponent } from './pages/character/attributes/attributes.component';
import { CharacterComponent } from './pages/character/character.component';
import { CombatTechniquesComponent } from './pages/character/combat-techniques/combat-techniques.component';
import { EquipmentComponent } from './pages/character/equipment/equipment.component';
import { OverviewComponent } from './pages/character/overview/overview.component';
import { SkillsComponent } from './pages/character/skills/skills.component';
import { SpecialAbilitiesComponent } from './pages/character/special-abilities/special-abilities.component';
import { SpellsComponent } from './pages/character/spells/spells.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    title: 'Log in',
    component: LoginComponent,
  },
  {
    path: 'characters',
    title: 'Character list',
    component: CharacterListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'character/:characterId',
    title: 'Character',
    component: CharacterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'attributes', component: AttributesComponent },
      { path: 'abilities', component: AbilitiesComponent },
      {
        path: 'advantages-disadvantages',
        component: AdvantagesDisadvantagesComponent,
      },
      { path: 'combat-techniques', component: CombatTechniquesComponent },
      { path: 'equipment', component: EquipmentComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'special-abilities', component: SpecialAbilitiesComponent },
      { path: 'spells', component: SpellsComponent },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'characters' }, // Redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
