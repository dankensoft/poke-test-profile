import { Component, ElementRef, Input, ViewChild } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  @Input() showUpload: boolean = false;
  @Input() hobbie?: string;
  @Input() age?: number;
  @Input() dui?: string;
  @Input() title?: string;
  @Input() titleIconSrc?: string;

  @ViewChild('profilePhoto') profilePhoto!: ElementRef;

  constructor() {}

  selectedFile?: ImageSnippet;


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.profilePhoto.nativeElement.src = this.selectedFile.src;

      console.log(this.selectedFile.src);
    });

    reader.readAsDataURL(file);
  }
}
