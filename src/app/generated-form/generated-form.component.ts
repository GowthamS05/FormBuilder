import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service'
@Component({
  selector: 'app-generated-form',
  templateUrl: './generated-form.component.html',
  styleUrls: ['./generated-form.component.css']
})
export class GeneratedFormComponent implements OnInit {
  isLoading: boolean;
  formValid: boolean;
  formDetail: any = {
    id: '',
    data: [],
    createdDate: '',
    formName: ''
  };
  constructor(private route: ActivatedRoute, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var id = params['id'];
      this.getForm(id);
    });
  }
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode === 45) {
      return true;
    }
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  toggleValue(item) {
    item.selected = !item.selected;
  }

  getForm(id) {
    let url = `https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder/${id}`
    this.appService.get(url).subscribe((res) => {
      this.toastr.success('Form Loaded Successfully', 'Success');
      this.formDetail = res;
      this.isLoading = true;
      console.log('IndiformRes', res);
    }, err => {
      this.toastr.error('Form not Created', 'Error');
      this.isLoading = true;
      console.log('formResErr', err);
    });
  }

  onFormSubmit(f) {
    this.formValid = true;
    let validationArray = this.formDetail.data;
    validationArray.forEach(field => {
      this.requiredValidation(field);
      this.validation(field);
      this.minMaxValidation(field);
      this.checkBoxValidation(field);
    });
    console.log('valid', this.formValid);
    if (this.formValid) {
      console.log('Valid', this.formDetail);

    }
  }

  checkBoxValidation(field) {
    if (field.required && field.type == 'checkbox') {
      if (field.values.filter(r => r.selected).length == 0) {
        this.toastr.error(`${field.label} is required`, 'Required Error');
        this.formValid = false;
      }
    }
  }

  requiredValidation(field: any) {
    if (field.required && !field.value && field.type != 'checkbox') {
      this.toastr.error(`${field.label} is required`, 'Required Error');
      this.formValid = false;
    }
  }

  validation(field: any) {
    if (field.validation && field.value) {
      let patt = new RegExp(field.regex);
      field.validationErr = patt.test(field.value);
      if (!field.validationErr) {
        this.toastr.error(`${field.label} is Invalid`, 'Validation Error');
        this.formValid = false;
      }
    }

  }
  minMaxValidation(field: any) {
    if (field.min && field.max) {
      if (field.value < field.min) {
        this.toastr.error(`${field.label} does not match min range`, 'Minimum Error');
        this.formValid = false;
      }
      if (field.value > field.max) {
        this.toastr.error(`${field.label} does not match max range`, 'Maximun Error');
        this.formValid = false;
      }

    }
  }
}
