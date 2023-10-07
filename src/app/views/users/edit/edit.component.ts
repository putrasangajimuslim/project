import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  id: any = '';
  succesAlert = false;
  customStylesValidated = false;
  msgAlert = '';
  editData: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit() {
    // Menggunakan ActivatedRoute untuk mengambil nilai 'id' dari URL
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.getEditData();
  }

  async getEditData() {
    try {
      // Lakukan permintaan API dengan fetch
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
    
      // Periksa apakah status respons adalah OK (kode status 200)
      if (!response.ok) {
        throw new Error('Permintaan API gagal: ' + response.status);
      }
    
      // Menguraikan data JSON dari respons
      const data = await response.json();
      this.editData = data;
      
    } catch (error) {
      // Tangani kesalahan di sini
      console.error('Terjadi kesalahan saat melakukan permintaan API:', error);
    }
  }

  async back() {
    this.router.navigate(['/users/list']);
  }

  async onSubmit() {
    this.customStylesValidated = true;

    try {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.editData.title,
          body: this.editData.body,
          userId: this.editData.userId,
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
