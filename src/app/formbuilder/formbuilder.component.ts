import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { getDateTime } from '../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {
  title = "Form Builder";
  updateId: string = '';
  value = {
    label: "",
    value: ""
  };
  isLoaded: boolean = true;
  @ViewChild('closeCreateFormModal') closeCreateFormModal: ElementRef;
  formName: string = '';
  fieldModels = [
    {
      "type": 'heading',
      "icon": "fa-header",
      "label": "Heading",
      "defaultClass": "h1",
      "alignHeader": "text-left",
      "listOfClass": [{
        label: 'H1',
        value: 'h1'
      },
      {
        label: 'H2',
        value: 'h2'
      },
      {
        label: 'H3',
        value: 'h3'
      },
      {
        label: 'H4',
        value: 'h4'
      },
      {
        label: 'H5',
        value: 'h5'
      },
      {
        label: 'H6',
        value: 'h6'
      }],
      "alignItems": [{
        label: "Left",
        class: "text-left"
      },
      {
        label: "Center",
        class: "text-center"
      },
      {
        label: "Right",
        class: "text-right"
      }],
      "value": "This is a Sample Heading"
    },
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text Field",
      "placeholder": "Enter your name",
      "className": "form-control",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }]
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "layout": "row",
      "regex": "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }]
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "placeholder": "Enter Number",
      "className": "form-control",
      "min": 0,
      "max": 90,
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }]
    },
    {
      "type": "text",
      "icon": "fa-phone",
      "label": "Phone",
      "placeholder": "Enter your phone number",
      "className": "form-control",
      "subtype": "Phone",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }]
    },
    {
      "type": "textarea",
      "icon": "fa-text-width",
      "label": "Textarea",
      "placeholder": "Enter Information",
      "rows": 3,
      "className": "form-control",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }]
    },
    {
      "type": "radio",
      "icon": "fa-circle-thin",
      "label": "Radio",
      "description": "Radio boxes",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }],
      "values": [
        {
          "label": "Radio 1",
          "value": "radio-1"
        },
        {
          "label": "Radio 2",
          "value": "radio-2"
        }
      ]
    },
    {
      "type": "checkbox",
      "label": "Checkbox",
      "icon": "fa-square-o",
      "description": "Checkbox",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }],
      "values": [
        {
          "label": "Checkbox 1",
          "value": "Checkbox-1"
        },
        {
          "label": "Checkbox 2",
          "value": "Checkbox-2"
        }
      ]
    },
    {
      "type": "select",
      "icon": "fa-caret-square-o-down",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select Values",
      "className": "form-control",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }],
      "values": [
        {
          "label": "DropDown 1",
          "value": "DropDown-1"
        },
        {
          "label": "DropDown 2",
          "value": "DropDown-2"
        },
        {
          "label": "DropDown 3",
          "value": "DropDown-3"
        }
      ]
    },
    {
      "type": "date",
      "icon": "fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control",
      "layout": "row",
      "layoutList": [{
        label: 'Horizontal',
        value: 'row'
      },
      {
        label: 'Vertical',
        value: 'column'
      }],
    },
    {
      "type": "button",
      "icon": "fa-paper-plane",
      "subtype": "submit",
      "label": "Submit",
      "alignHeader": "text-left",
      "alignItems": [{
        label: "Left",
        class: "text-left"
      },
      {
        label: "Center",
        class: "text-center"
      },
      {
        label: "Right",
        class: "text-right"
      }],
    }
  ];

  modelFields = [];
  model: any = {
    theme: {
      bgColor: "ffffff",
      textColor: "555555",
    },
    attributes: this.modelFields
  };
  constructor(private appService: AppService, private toastr: ToastrService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formName = '';
    this.activatedRoute.params.subscribe(params => {
      this.updateId = params['id'];
      if (this.updateId) {
        this.getForm(this.updateId);

      }
    });
  }
  getForm(id) {
    let url = `https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder/${id}`;
    this.isLoaded = false;
    this.appService.get(url).subscribe((res) => {
      this.toastr.success('Form Loaded Successfully', 'Success');
      // let data = JSON.parse(res['formdata']);
      let data = res['formData'];
      this.model = {
        attributes: data
      };
      this.formName = res['formName'];
      this.isLoaded = true;

      console.log('Update', res);
    }, err => {
      this.isLoaded = true;
      this.toastr.error('Form not Created', 'Error');
    });
  }


  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }
  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + this.makeName(6);
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  removeField(i) {
    this.model.attributes.splice(i, 1);
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }
  makeName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  createForm(id) {
    if (id) {
      this.updateForm(id);
    }
    else {
      this.submitForm();
    }
    this.closeCreateFormModal.nativeElement.click();

  }
  updateForm(id) {
    let url = `https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder/${id}`;
    this.isLoaded = false;
    let data = {
      formName: this.formName,
      createdDate: getDateTime(),
      formData: [...this.model.attributes]
    };
    this.appService.put(url, data).subscribe((res) => {
      this.toastr.success('Form Updated Successfully', 'Success');
      this.model.attributes = [];
      this.isLoaded = true;
      this.route.navigateByUrl('/list');
    }, err => {
      this.toastr.error('Form Updated Created', 'Error');
      console.log('err', err);
      this.isLoaded = true;
    });
  }
  addValue(values) {
    values.push(this.value);
    this.value = { label: "", value: "" };
  }
  submitForm() {
    let url = 'https://my-json-server.typicode.com/GowthamS05/FormBuilder/formBuilder';
    let data = {
      id: this.makeName(6),
      formName: this.formName,
      createdDate: getDateTime(),
      formData: [...this.model.attributes]
    };
    this.isLoaded = false;
    this.appService.post(url, data).subscribe((res) => {
      this.toastr.success('Form Created Successfully', 'Success');
      console.log('res', res);
      this.model.attributes = [];
      this.route.navigateByUrl('/list');
      this.isLoaded = true;
    }, err => {
      this.toastr.error('Form not Created', 'Error');
      console.log('err', err);
      this.isLoaded = true;

    });
    this.formName = '';
  }
}
