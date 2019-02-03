import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { identityRevealedValidator, forbiddenNameValidator } from './../forbidden.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  // name = new FormControl('');
  profileForm: FormGroup;
  profileForm_O: any   = {
    nombreCompleto: {
      firstName: 'Nancy',
      lastName: ''
    },
    mail: 'example@outlook.com'
  };
  constructor() {
    console.warn(this.profileForm_O);
    this.profileForm = new FormGroup({
      nombreCompleto: new FormGroup(
        {
          firstName: new FormControl(
            '',
            [ Validators.required, Validators.minLength(4),
              forbiddenNameValidator(/^eduardo$/i) // <-- Here's how you pass in the custom validator.
         ]),
          lastName: new FormControl('', [Validators.required]),
        }
      ),
      mail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      cursos : new FormArray([
        new FormControl('', Validators.required)
      ]),
      username: new FormControl('', Validators.required,this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl('')

    }, { validators: identityRevealedValidator });
    // this.profileForm.setValue(this.profileForm_O);
    this.profileForm.controls['password2'].setValidators([
      Validators.required,
      this.equal_data.bind(this.profileForm)
    ])
    this.profileForm.valueChanges.subscribe(data=>{
      console.log("___________0");
      console.log(data);
      console.log("___________1");
    });
    this.profileForm.controls.username.valueChanges.subscribe(data=>{
      console.log("___________0");
      console.error(data);
      console.log("___________1");
    });
    this.profileForm.get("username").statusChanges.subscribe(data=>{
      console.log("___________0");
      console.error(data);
      console.log("___________1");
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm);
    // console.warn(this.profileForm.controls.nombreCompleto.value.firstName);
    // console.warn(this.profileForm.value);
  }
  reset() {
    this.profileForm.reset(this.profileForm_O);
    this.profileForm.get('nombreCompleto.firstName').setValue('Nancy_');
  }
  /*Patching the model value*/
  updateProfile() {
    this.profileForm.patchValue(this.profileForm_O);
  }
  addAlias() {
    (<FormArray>this.profileForm.controls['cursos']).push(
      new FormControl('', [Validators.required])
    );
  }
  equal_data (control: AbstractControl): {[key: string]: boolean}{
    console.warn('forbiddenNameValidator: ' + control.value);
    console.log(this);
    let forma:any = this;
    if( control.value!==forma.controls['password1'].value ){
      return {
        noigual: true
      }
    }
    return  null;
  };
  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    var p1 = new Promise( (resolve,reject)=>{
        setTimeout(() => {
          if( control.value==="Eduardo" ){
            resolve({exite:true})
          }else{
            resolve(null);
          }
        }, 3000);
    });
    return p1;
  }

}
