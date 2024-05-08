import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { ApiService } from './api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  userForm!: FormGroup;
  _service = inject(ApiService);
  @ViewChild('myModal') myModal!: ElementRef;

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder) { }


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
        this.userForm.reset()
        this.modalRef?.hide();
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
}
