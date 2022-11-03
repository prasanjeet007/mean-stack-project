 import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/posts';
import { PostsService } from '../services/post-service/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {
 
  panelOpenState = false;
  posts:Post[]=[];
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res.posts;
    });
    this.postService.postCreateData.subscribe(res=>{
      this.posts.push(res.posts);
      console.log(this.posts);
    })
    
  }
  ngAfterViewInit(): void {
   
  }

}
