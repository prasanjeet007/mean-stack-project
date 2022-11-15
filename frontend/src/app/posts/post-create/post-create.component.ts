import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PostsService } from 'src/app/services/post-service/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = "My new Post";
  postCreateForm: FormGroup;
  submitButton:boolean = true;
  constructor(private postService: PostsService, private router:Router, private route:ActivatedRoute) {
   this.postFormIntialize();
   }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.postService.getPostById(id).pipe(map(data=>data.posts)).subscribe((post)=>{
        this.postCreateForm.setValue({
          id:post._id,
          title:post.title,
          content:post.content
        });
        this.submitButton = false;
      });
    }
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
      this.router.navigate(['/post-list']);
    });
  } else {
    alert('Please fill the form first');
  }
}
updatePost(formData:FormGroup) {
 this.postService.updatePostById(formData).subscribe((res)=>{
  this.postService.updatedPostData.next(res);
   this.router.navigate(['/post-list']);
 });
}
}
