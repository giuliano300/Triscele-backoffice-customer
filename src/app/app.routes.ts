import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { QuotationsComponent } from './pages/orders/quotations/quotations.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { RoleGuard } from './authGuard/AuthGuard';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { PwdRecoveryComponent } from './authentication/pwd-recovery/pwd-recovery.component';

export const routes: Routes = [
    { path: '', redirectTo : '/authentication', pathMatch: 'full' },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
        ]
    },
    {
        path: '',
        children: [
            { path: 'dashboard', 
                component: DashboardComponent,
                canActivate: [RoleGuard],
                data: { role: 'customer' }
             },
            { path: 'orders', component: OrdersComponent,
                canActivate: [RoleGuard],
                data: { role: 'customer' }
            },
            { path: 'quotations', component: QuotationsComponent,
                canActivate: [RoleGuard],
                data: { role: 'customer' }
            },
            { path: 'order/add/:id', component: AddOrderComponent,
                canActivate: [RoleGuard],
                data: { role: 'customer' }
            },
            { path: 'order/add', component: AddOrderComponent,
                canActivate: [RoleGuard],
                data: { role: 'customer' }
            },
            {
                path: 'access-denied',
                component: AccessDeniedComponent
            },
            {
                path: 'authentication/reset-password',
                component: ResetPasswordComponent
            },
            {
                path: 'authentication/pwd-recovery',
                component: PwdRecoveryComponent
            }
        ]
    },
    { path: '**', component: NotFoundComponent},
];
