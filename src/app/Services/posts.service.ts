import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  protected url = "https://jrueda-andesscd-backend.herokuapp.com"
  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:8000';
  }

  getPosts(uri: string) {
    return this.http.get<any>(this.url + "/" + uri);
  }

  getPost(id: any) {
    return this.http.get<any>(this.url + "/" + id);
  }

  savePost(id: any, body: string) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    let item = JSON.parse(body);
    var form_data = new FormData();

    for (var key in item) {
      form_data.append(key, item[key]);
    }
    return this.http.post<any>(this.url + "/" + id, form_data, { headers });
  }

  updatePost(id: any, body: string) {
    let headers = new HttpHeaders();
    body = JSON.parse(body);
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');
    // let item = JSON.parse(body);
    // var form_data = new FormData();

    // for (var key in item) {
    //   form_data.append(key, item[key]);
    // }
    return this.http.put<any>(this.url + "/" + id, body, { headers });
  }

  deletePost(id: any) {
    return this.http.delete<any>(this.url + "/" + id);
  }

  getAuthors(uri: string) {
    return this.http.get<any>(this.url + "/" + uri);
  }
}
