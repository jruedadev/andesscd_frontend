import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/blog/post';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  protected id: number;
  protected post!: Post;

  constructor(private route: ActivatedRoute, private http: HttpClient, private postService: PostsService, private router: Router) {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.getPost(this.id);
    }
  }

  getPost(id: any) {
    this.postService.getPost('api/blog/' + id).subscribe((response) => {
      this.post = response.data;
      console.log(this.post);
    });
  }

  deletePost(id: any) {
    let uri = 'api/blog/';
    uri += id;
    this.postService.deletePost(uri).subscribe({
      next: response => {
        alert('Delete successful');
        this.router.navigate(['/posts/']);
      },
      error: response => {
        console.error('There was an error!', response);
      }
    });
  }

}
