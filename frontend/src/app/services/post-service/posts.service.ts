import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postCreateData = new BehaviorSubject<Post>({_id:'',title:'',content:''});
  setFormData = new Subject<Post>();
  updatedPostData = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  addPosts(postData: Post) {
    return this.http.post<{message:string,posts:Post}>(`${environment.URL}/api/posts`, postData);
  }
  getPosts() {
    return this.http.get<{message: string, posts:Post[]}>(environment.URL+'/api/posts');
  }
  deletePostById(id:string) {
    return this.http.delete<any>(environment.URL+'/api/posts/'+id);
  }
  getPostById(id:string) {
    return this.http.get<any>(environment.URL+'/api/posts/'+id);
  }
  updatePostById(body:any){
    return this.http.put<any>(environment.URL+`/api/posts/${body.id}`,body);
  }
}
