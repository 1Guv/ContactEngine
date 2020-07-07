import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SMSProvider } from './models/sms-provider';
import { Countries } from './models/country';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'ContactEngineApp';
  countries: Countries;
  selected: string;
  form: FormGroup;

  constructor(
    private apiService: ApiService, 
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      "name": ["", Validators.required],
      "country_id": ["", Validators.required],
      "originating_number": ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getAllCountries();
    // this.getAllSMSProviders();
  }

  getAllCountries() {
    this.apiService.getCountries()
      .subscribe( countries => {
        this.countries = countries;
      })
  }

  // getAllSMSProviders() {
  //   this.apiService.getSMSProviders()
  //   .subscribe( providers => {
  //     console.log('SMS Providers', providers);
  //   })
  // }

  addSMSProvider(provider: SMSProvider) {
    this.apiService.createSMSProvider(provider)
      .subscribe(resp => {
        if (resp === null) {
          this.snackBarMessage(`${provider.name} provider added`)
        }
      },
      err => {
        
        if (err.status === 400 && err.error === 'Provider already exists') {
          this.snackBarMessage('Provider already exists, please try again!');
        }

      })
  }

  onSubmit() {
    if (this.form.valid) {
      this.addSMSProvider(this.form.value);
    }
  }

  snackBarMessage(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
    })
  }
}
