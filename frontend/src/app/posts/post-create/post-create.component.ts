import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Post } from 'src/app/models/posts';
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
    this.postService.setFormData.subscribe((post)=>{
      this.postCreateForm.setValue({
        id:post._id,
        title:post.title,
        content:post.content
      })
    });
  }
  postFormIntialize() {
    this.postCreateForm = new FormGroup({
      id:new FormControl(''),
      title:new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      content:new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(150)])
    });
  }
  addPost() {
    if(this.postCreateForm.valid) {
    this.postService.addPosts(this.postCreateForm.value).pipe(map((result)=>result.posts)).subscribe((res)=> {
      this.postService.postCreateData.next(res);
    })
    this.postFormIntialize();
  } else {
    alert('Please fill the form first');
  }
}
updatePost(formData:FormGroup) {
  console.log('formData',formData);
 this.postService.updatePostById(formData).subscribe((res)=>{
  console.log('updatedresult',res);
  this.postService.updatedPostData.next(res);
  this.postFormIntialize();
 });
}
}
