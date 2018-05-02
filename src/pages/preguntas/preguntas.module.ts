import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreguntasPage } from './preguntas';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    PreguntasPage,
  ],
  imports: [
    IonicPageModule.forChild(PreguntasPage),
    HeaderComponentModule
  ],
})
export class PreguntasPageModule {}
