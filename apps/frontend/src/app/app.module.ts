import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModules } from './ng-modules.constant';
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

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    OverviewComponent,
    AttributesComponent,
    AbilitiesComponent,
    SkillsComponent,
    CombatTechniquesComponent,
    SpecialAbilitiesComponent,
    AdvantagesDisadvantagesComponent,
    SpellsComponent,
    CharacterComponent,
    EquipmentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
