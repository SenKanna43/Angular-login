import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'myProject';

  username : string= ''
  password : string= ''

  service = inject(LoginService)

  onSubmit(){
    let obj = {
       username: this.username,
       password: this.password
    }
    this.service.onLoginAuthentication(obj).subscribe((response:any) => {
      console.log(response);
      sessionStorage.setItem('access_token', response.token);
    });
  }
}
