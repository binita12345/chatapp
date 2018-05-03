import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsefulinfoPage } from './usefulinfo';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    UsefulinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UsefulinfoPage),
    HeaderComponentModule
  ],
})
export class UsefulinfoPageModule {}
