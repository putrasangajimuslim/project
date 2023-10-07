import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule, NavModule, TabsModule, UtilitiesModule, FormModule, AlertModule, ModalModule, ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: 'list', component: UsersComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  declarations: [UsersComponent, EditComponent, CreateComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    FormModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule
  ],
})
export class UsersModule { }
