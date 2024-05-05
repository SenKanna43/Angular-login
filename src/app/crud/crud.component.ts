import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ApiService } from './api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  _service = inject(ApiService);
  @ViewChild('myModal') myModal!: ElementRef;

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  showUsersList: any = [];

  getAllUsers() {
    this._service.getAllUser().subscribe({
      next: (response) => {
        console.log(response);
        this.showUsersList = response;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  postUser() {
    if (this.userForm.invalid) {
      return;
    }
    // Handle form submission here
    console.log(this.userForm.value);

    this._service.postUser(this.userForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
