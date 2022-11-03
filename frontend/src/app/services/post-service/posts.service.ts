import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postCreateData = new Subject<{message:string, posts:Post}>();
  constructor(private http: HttpClient) { }
  addPosts(postData: Post) {
    return this.http.post<{message:string,posts:Post}>(`${environment.URL}/api/posts`, postData);
  }
  getPosts() {
    return this.http.get<{message: string, posts:Post[]}>(environment.URL+'/api/posts');
  }
}
