import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    VideosPage,
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
    HeaderComponentModule
  ],
})
export class VideosPageModule {}
