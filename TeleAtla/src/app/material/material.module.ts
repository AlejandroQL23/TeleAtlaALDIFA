import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const MaterialComponents = [
  MatProgressSpinnerModule
]

@NgModule({
  imports:[MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
