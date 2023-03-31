import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { usersRoutes } from './lib.routes'

import { LoginComponent } from './pages/login/login.component'
import { InputTextModule } from 'primeng/inputtext'
import { InputMaskModule } from 'primeng/inputmask'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { CardModule } from 'primeng/card'
import { ToastModule } from 'primeng/toast'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromUsers from './state/users.reducer'
import { UsersEffects } from './state/users.effects'
import { UsersFacade } from './state/users.facade'
import { RegisterComponent } from './pages/register/register.component'
import { MessageService } from 'primeng/api'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(usersRoutes),
        InputTextModule,
        InputMaskModule,
        ButtonModule,
        DropdownModule,
        CardModule,
        ToastModule,
        StoreModule.forFeature(
            fromUsers.USERS_FEATURE_KEY,
            fromUsers.usersReducer
        ),
        EffectsModule.forFeature([UsersEffects]),
    ],
    declarations: [LoginComponent, RegisterComponent],
    providers: [UsersFacade, MessageService],
})
export class UsersModule {}
