import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
    selector: 'admin-header',
    templateUrl: './header.component.html',
    styles: [],
})
export class HeaderComponent implements OnInit {
    @Output() slideMode: EventEmitter<boolean> = new EventEmitter()

    ngOnInit(): void {
        this.slideMode.emit(
            document.querySelector('.open').classList.contains('d-none')
        )
    }

    showSlide() {
        this.slideMode.emit(
            !document.querySelector('.open').classList.contains('d-none')
        )
        document.querySelector('.open').classList.toggle('d-none')
        document.querySelector('.close').classList.toggle('d-none')
    }
}
