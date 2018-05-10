import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassportloginPage } from './passportlogin';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    PassportloginPage,
  ],
  imports: [
    IonicPageModule.forChild(PassportloginPage),
    FooterComponentModule
  ],
})
export class PassportloginPageModule {}
