import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { User } from '../../models/user'
import { UsersService } from '../../services/users.service'

@Component({
    selector: 'users-register',
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent implements OnInit {
    form!: FormGroup
    isSubmitted = false
    editMode = false
    usersCurrentID = ''
    countries: { id: string; name: string }[] = []

    constructor(
        private formbuilder: FormBuilder,
        private usersService: UsersService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this._initUsersForm()
        this._getCountries()
        this._checkEditMode()
    }

    private _initUsersForm() {
        this.form = this.formbuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            street: ['', Validators.required],
            apartment: ['', Validators.required],
            zip: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
        })
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries()
    }

    onSubmit() {
        this.isSubmitted = true
        if (this.form.invalid) {
            return
        }
        const user: User = {
            id: this.usersCurrentID,
            name: this.userForm['name'].value,
            email: this.userForm['email'].value,
            country: this.userForm['country'].value,
            city: this.userForm['city'].value,
            apartment: this.userForm['apartment'].value,
            password: this.userForm['password'].value,
            phone: this.userForm['phone'].value,
            street: this.userForm['street'].value,
            zip: this.userForm['zip'].value,
            isAdmin: false,
        }
        this.usersService.registerUser(user).subscribe({
            next: (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is created!`,
                })
                this.router.navigateByUrl('/')
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'User is not created!',
                })
            },
        })
    }

    get userForm() {
        return this.form.controls
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true
                this.usersCurrentID = params['id']
                this.usersService
                    .getUser(this.usersCurrentID)
                    .subscribe((user) => {
                        this.form.controls['name'].setValue(user.name)
                        this.form.controls['email'].setValue(user.email)
                        this.form.controls['phone'].setValue(user.phone)
                        this.form.controls['street'].setValue(user.street)
                        this.form.controls['apartment'].setValue(user.apartment)
                        this.form.controls['zip'].setValue(user.zip)
                        this.form.controls['city'].setValue(user.city)
                        this.form.controls['country'].setValue(user.country)
                        this.form.controls['password'].setValue(user.password)
                        this.form.controls['password'].setValidators([])
                        this.form.controls['password'].updateValueAndValidity()
                    })
            }
        })
    }
}
