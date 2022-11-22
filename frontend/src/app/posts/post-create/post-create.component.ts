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
  imagePreview: string;
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
      content:new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(150)]),
      image: new FormControl('',[Validators.required])
    });
    this.imagePreview = null;
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

onImagePicked(event) {
  const file = event.target.files[0];
  const imageType = file.type.split("/")[1];
  this.postCreateForm.patchValue({
    image:file
  });
  this.postCreateForm.get('image').updateValueAndValidity();
  if(file && (imageType === 'png'||imageType==='jpg'||imageType==='jpeg')) {
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
  confirm("Enter a valid image");
    return;
  }
}

deleteImagePreview() {
  this.imagePreview = null;
  this.postCreateForm.patchValue({
    image:''
  });
}
}
