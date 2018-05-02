import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CelularesPage } from './celulares';

@NgModule({
  declarations: [
    CelularesPage,
  ],
  imports: [
    IonicPageModule.forChild(CelularesPage),
  ],
})
export class CelularesPageModule {}
