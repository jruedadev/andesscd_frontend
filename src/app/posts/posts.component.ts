import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../Services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  protected postService;
  protected posts: any;
  protected paginator: any;
  constructor(private http: HttpClient) {
    this.postService = new PostsService(http);
  }

  ngOnInit() {
    this.postService.getPosts("api/blog").subscribe((response: any) => {
      this.posts = response.data.data;
      this.paginator = response.data.links;
      console.log(this.posts, response.data);
    });
  }

  paginate(url: string) {
    let page = url.match(/page=([0-9+])/);
    let uri = "api/blog?page=" + page![1];
    this.postService.getPosts(uri).subscribe((response: any) => {
      this.posts = response.data.data;
      this.paginator = response.data.links;
      // console.log(this.posts, response.data);
    });
  }

  deletePost(id: any) {
    let uri = 'api/blog/';
    uri += id;
    this.postService.deletePost(uri).subscribe({
      next: response => {
        this.postService.getPosts("api/blog").subscribe((response: any) => {
          this.posts = response.data.data;
          this.paginator = response.data.links;
          // console.log(this.posts, response.data);
        });
        alert('Delete successful');
      },
      error: response => {
        console.error('There was an error!', response);
      }
    });
  }
}
