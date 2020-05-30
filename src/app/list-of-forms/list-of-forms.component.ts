import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-forms',
  templateUrl: './list-of-forms.component.html',
  styleUrls: ['./list-of-forms.component.css']
})
export class ListOfFormsComponent implements OnInit {
  formList: any = [];
  @ViewChild('closeDeleteForm') closeDeleteForm: ElementRef;

  isLoading: boolean = false;
  url = 'https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder';
  constructor(private appService: AppService, private toastr: ToastrService, private router: Router) {
    this.getForms();
  }

  getForms() {
    this.appService.get(this.url).subscribe((res) => {
      this.toastr.success('List of forms Loaded', 'Success');
      this.isLoading = true;
      this.formList = res;
      this.formList = [...this.formList].reverse();
      console.log('formRes', res);
    }, err => {
      this.toastr.error('Form not Created', 'Error');
      this.isLoading = true;
      console.log('formResErr', err);
    });
  }

  ngOnInit(): void {
  }
  deleteForm(item) {
    let url = `https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder/${item.id}`;
    this.appService.delete(url).subscribe((res) => {
      this.toastr.success('Form Deleted SuccessFully', 'Success');
      this.closeDeleteForm.nativeElement.click();
      this.getForms();
    },
      err => {
        this.toastr.error('Form not Deleted', 'Error');
        console.log('formResErr', err);
      });
  }
  navigateTOFormBuilder() {
    this.router.navigateByUrl('/formBuilder');

  }

}
