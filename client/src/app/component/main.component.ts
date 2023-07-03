import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherApi } from '../models';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form!: FormGroup

  constructor(
    private fb : FormBuilder,
    private router : Router
  ) {}

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required]),
      units: this.fb.control<string>('metric', [Validators.required])
    })
  }

  ngOnInit(): void {
    console.info(">> form: ", this.form)
    this.form = this.createForm()
    console.info(">> form: ", this.form)
  }
  
  submitForm() {
    const query = this.form.value as WeatherApi
    console.info(">> query: ", query)
    const queryParams : Params = {units : query.units}
    this.router.navigate(['weather', query.city], { queryParams: queryParams})
  }

}
