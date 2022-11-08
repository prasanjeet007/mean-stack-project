import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from '../models/posts';
import { PostsService } from '../services/post-service/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  panelOpenState = false;
  posts:Post[]=[];
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts().pipe(map(data=>data.posts)).subscribe(res => {
      this.posts = res;
    });
      this.postService.postCreateData.subscribe((postData)=>{
          this.posts.push(postData);
      });
      this.postService.updatedPostData.pipe(map((data)=>data.posts)).subscribe((post:Post)=>{
         const index = this.posts.findIndex((postData)=>postData._id===post._id);
         this.posts.splice(index,1);
         this.posts.splice(index,0,post);
         console.log(this.posts);
      })
  }
 
  deletePost(id:string) {
    this.postService.deletePostById(id).pipe(map(data=>data.posts)).subscribe(()=>{
      this.posts = this.posts.filter((post)=>post._id!==id);
    });
  }
  getPostById(id:string){
    this.postService.getPostById(id).pipe(map(data=>data.posts)).subscribe((post)=>{
      console.log('getbyId',id);
      this.postService.setFormData.next(post);
    })
  }
}
