import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/post-service/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = "My new Post";
  postCreateForm: FormGroup;
  constructor(private postService: PostsService) {
   this.postFormIntialize();
   }

  ngOnInit(): void {
  }
  postFormIntialize() {
    this.postCreateForm = new FormGroup({
      id: new FormControl(+(Math.random() * 10000).toPrecision(4)),
      title:new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      content:new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(50)])
    });
  }
  addPost() {
    if(this.postCreateForm.valid) {
    this.postService.addPosts(this.postCreateForm.value).subscribe((res)=> {
      this.postService.postCreateData.next(res);
    })
    this.postFormIntialize();
  } else {
    alert('Please fill the form first');
  }
}
}
