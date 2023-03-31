import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CartService } from '@eshop/orders'
import { AuthService, LocalstorageService, UsersService } from '@eshop/users'

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    isUserAuthenticated = false

    constructor(
        private cartService: CartService,
        private usersService: UsersService,
        private router: Router,
        private localStorageService: LocalstorageService
    ) {
        cartService.initCartLocalstorage()
    }
    ngOnInit() {
        this.usersService
            .isCurrentUserAuth()
            .subscribe((isUserAuthenticated) => {
                this.isUserAuthenticated = isUserAuthenticated
            })
    }

    logout() {
        this.localStorageService.removeToken()
        this.usersService.initAppSession()
    }
}
