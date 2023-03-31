import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { AuthService } from '@eshop/users'

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnChanges {
    @Input() statusMode: boolean

    constructor(private authService: AuthService) {}

    ngOnChanges() {
        console.log(this.statusMode)
        if (this.statusMode)
            document.querySelector('.admin-sidebar').classList.add('slide')
        else document.querySelector('.admin-sidebar').classList.remove('slide')
    }

    logoutUser() {
        this.authService.logout()
    }
}
