import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/blog/post';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-post-create-edit-form',
  templateUrl: './post-create-edit-form.component.html',
  styleUrls: ['./post-create-edit-form.component.scss']
})
export class PostCreateEditFormComponent implements OnInit {

  protected id: any;
  protected post!: Post;
  protected authors: any;
  protected user_id: number = 0;
  protected file: File | undefined;


  constructor(private http: HttpClient, private route: ActivatedRoute, private postService: PostsService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id !== null) {
      this.getPost(this.id);
    }
    this.getAuthors();
    console.log("validating POST ID", this.id);
  }

  ngOnInit(): void {
    if (this.id == null || this.id == 0) {
      this.post = {
        id: 0,
        user_id: 0,
        title: "",
        content: "",
        short_description: "",
        banner: "",
        created_at: "",
        updated_at: "",
        author: {}
      }
    }
  }

  getPost(id: any) {
    this.postService.getPost('api/blog/' + id).subscribe((response) => {
      this.post = response.data;
      console.log(this.post);
    });
  }

  getAuthors() {
    this.postService.getAuthors('api/users').subscribe((response) => {
      this.authors = response;
    });
  }

  //file type validation
  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      if (file.type == "image/jpeg") {
        console.log("correct file");
      }
      else {
        alert("Archivo no válido, se requiere una imagen JPG.");
        this.file = undefined;
      }
    }
    this.handleUpload($event);
  }

  setUserId() {
    this.post.user_id = this.user_id
  }

  submitForm() {
    let post = JSON.stringify(this.post);
    if (this.id !== 0 && this.id !== null) {
      console.log("Update Post");
      this.postService.updatePost('api/blog/' + this.post.id, post).subscribe({
        next: response => {
          alert('Update successful');
          console.table(response);
          this.post = response.data;
        },
        error: response => {
          console.error('There was an error!', response);
          let message = response.error.message;
          alert(message);
          console.table(this.post);
        }
      });
    } else {
      console.log("Create Post");
      this.postService.savePost('api/blog', post).subscribe({
        next: response => {
          alert('Post Creation successful');
          console.table(response);
          this.router.navigate(['/post/detail', { id: response.data.id }]);
        },
        error: response => {
          console.error('There was an error!', response);
          let message = response.error.message;
          alert(message);
          console.table(this.post);
        }
      });
    }
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.post.banner = reader.result;
    };
  }
}
