import { Component } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { ToggleService } from './toggle.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, NgClass, NgIf],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        DatePipe
    ]
})
export class HeaderComponent {
    area: string = "";

    constructor(
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private router: Router
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.formattedDate = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');

        this.authService.loginName$.subscribe(val => {
            this.area = val || (localStorage.getItem('loginName')?.replace(/^"|"$/g, '')) || '';
        });

        

    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    ngOnInit(){
        
    }

    // Current Date
    currentDate: Date = new Date();
    formattedDate: any;

}