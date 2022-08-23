import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appPaths } from '../configs/appPaths';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(
      [{ path: appPaths.empty, component: AuthComponent }]
    )
  ],
  exports: [],
  declarations: [
    AuthComponent
  ],
  providers: [],
})
export class AuthModule { }
