import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  protected url = "https://jrueda-andesscd-backend.herokuapp.com"
  constructor(private http: HttpClient) { }

  getPosts(uri: string) {
    return this.http.get<any>(this.url + "/" + uri);
  }

  getPost(id: any) {
    return this.http.get<any>(this.url + "/" + id);
  }

  updatePost(id: any, body: JSON) {
    return this.http.put<any>(this.url + "/" + id, body);
  }

  deletePost(id: any) {
    return this.http.delete<any>(this.url + "/" + id);
  }
}
