import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  post: any = [];
  request: any = [];
  isModalOpen: boolean = false;
  succesAlert = false;
  msgAlert = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.getDataJson();
  }

  async getDataJson() {
    try {
      // Lakukan permintaan API dengan fetch
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
      // Periksa apakah status respons adalah OK (kode status 200)
      if (!response.ok) {
        throw new Error('Permintaan API gagal: ' + response.status);
      }
    
      // Menguraikan data JSON dari respons
      const data = await response.json();
    
      this.post = data;
      console.log(this.post);
      
    } catch (error) {
      // Tangani kesalahan di sini
      console.error('Terjadi kesalahan saat melakukan permintaan API:', error);
    }
  }

  async tambahItem() {
    this.router.navigate(['/users/create']);
  }

  async editItem(params: any) {
    this.router.navigate(['/users/edit', params]);
  }

  async deleteItem(params: any) {
    this.isModalOpen = true;

    this.request.push(params);

    if (this.request.length > 1) {

      const deleRes = this.request[1];

      if (deleRes == 'ya') {
        try {
          fetch(`https://jsonplaceholder.typicode.com/posts/${this.request[0]}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              // Lanjutkan dengan pemrosesan jika response ok
              this.succesAlert = true;
              this.msgAlert = 'Success Delete Data';
              this.isModalOpen = false;

              setTimeout(() => {
                this.succesAlert = false;
              }, 2000);
            })
            .then(data => {
              // Lakukan sesuatu dengan data yang diterima setelah DELETE berhasil
              console.log(data);
            })
            .catch(error => {
              // Tangani kesalahan yang mungkin terjadi selama permintaan DELETE
              console.error('Ada kesalahan:', error);
            });
        } catch (error) {
          // Tangani kesalahan yang terjadi saat fetch() dipanggil
          console.error('Ada kesalahan saat melakukan fetch:', error);
        }
      }
    }
  }

  async closeModal() {
    this.isModalOpen = false;
    this.request = [];
  }
}
