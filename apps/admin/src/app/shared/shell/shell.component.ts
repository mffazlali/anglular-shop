import { Component } from '@angular/core'

@Component({
    selector: 'admin-shell',
    templateUrl: './shell.component.html',
})
export class ShellComponent {
    slideMode: boolean

    statusSlide(event) {
        console.log(event)
        this.slideMode = event
    }
}
