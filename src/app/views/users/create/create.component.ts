import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  title = '';
  body = '';
  userId = '';

  customStylesValidated = false;
  succesAlert = false;
  msgAlert = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async create() {

  }
  
  async back() {
    this.router.navigate(['/users/list']);
  }

  async onSubmit() {
    this.customStylesValidated = true;
    
    try {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          body: this.body,
          userId: this.userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Permintaan HTTP gagal');
          }
          
          this.succesAlert = true;
          this.msgAlert = 'Success Insert Data';
          setTimeout(() => {
            this.succesAlert = false;
            this.back();
          }, 2000);
        })
        .then((json) => {
          console.log(json);
        });
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }
}
