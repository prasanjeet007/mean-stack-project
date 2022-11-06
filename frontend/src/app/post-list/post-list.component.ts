import { Component, OnInit } from '@angular/core';
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
    this.postService.getPosts().subscribe(res => {
      if (res.posts) {
        this.posts = res.posts;
      }
    });
    if(this.posts) {
      this.postService.postCreateData.subscribe((postData)=>{
        this.posts.push(postData);
      });
    }
  }

}
