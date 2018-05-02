import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CelularesPage } from './celulares';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    CelularesPage,
  ],
  imports: [
    IonicPageModule.forChild(CelularesPage),
    HeaderComponentModule
  ],
})
export class CelularesPageModule {}
