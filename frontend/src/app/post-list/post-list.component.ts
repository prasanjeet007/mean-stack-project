import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loading:boolean = true;
  constructor(private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getPosts().pipe(map(data=>data.posts)).subscribe(res => {
      this.posts = res;
      this.loading = false;
    });
      this.postService.postCreateData.subscribe((postData)=>{
          this.posts.push(postData);
          this.loading = false;
      });
      this.postService.updatedPostData.pipe(map((data)=>data?data.posts:'')).subscribe((post:any)=>{
         const index = this.posts.findIndex((postData)=>postData._id===post._id);
         this.posts.splice(index,1);
         this.posts.splice(index,0,post);
         this.loading = false;
      })
  }
 
  deletePost(id:string) {
    this.loading = true;
    this.postService.deletePostById(id).pipe(map(data=>data.posts)).subscribe(()=>{
      this.posts = this.posts.filter((post)=>post._id!==id);
      this.loading = false;
    });
  }
  getPostById(id:string){
    this.loading = true;
    this.router.navigate(['/post-create',id]);
  }
}
