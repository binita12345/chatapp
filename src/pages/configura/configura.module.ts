import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguraPage } from './configura';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    ConfiguraPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguraPage),
    HeaderComponentModule
  ],
})
export class ConfiguraPageModule {}
