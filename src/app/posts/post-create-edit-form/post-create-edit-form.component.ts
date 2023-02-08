import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-post-create-edit-form',
  templateUrl: './post-create-edit-form.component.html',
  styleUrls: ['./post-create-edit-form.component.scss']
})
export class PostCreateEditFormComponent {
  protected id: any;
  protected post: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private postService: PostsService) {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    if (this.id != 'create') {
      this.post = this.getPost(this.id);
    }
  }

  getPost(id: any) {
    this.postService.getPost(id).subscribe((response) => {
      this.post = response.data.data;
    });
  }
}
