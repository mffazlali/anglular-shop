import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BannerComponent } from './components/banner/banner.component'
import { SliderComponent } from './components/slider/slider.component'
import { ButtonModule } from 'primeng/button'
import { GalleryComponent } from './components/gallery/gallery.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { SpinnerInterceptorService } from './services/spinner-interceptor.service'

@NgModule({
    imports: [CommonModule, ButtonModule, ProgressSpinnerModule],
    declarations: [
        BannerComponent,
        SliderComponent,
        GalleryComponent,
        SpinnerComponent,
    ],
    exports: [
        BannerComponent,
        SliderComponent,
        GalleryComponent,
        SpinnerComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptorService,
            multi: true,
        },
    ],
})
export class UiModule {}
