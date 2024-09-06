import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  constructor(
    private  activatedRoute: ActivatedRoute,
    private countriesService:CountriesService
  ){

  }
  ngOnInit(): void {
    //Primera Version
    // this.activatedRoute.params.subscribe(
    //   // (params:any)=>{ //No se recomeinda usar el tipo de dato ANY
    //   //   console.log(params);
    //   //   console.log(params.id);
        
    //   // }
    //   params=>{
    //     console.log(params);
    //     console.log(params['id']);
        
    //   }
    // );

    // Segunda Version
    // this.activatedRoute.params
    // .subscribe(({id})=>{
    //     console.log({params:id});
        
    //   }
    // );

    // Tercera Versión
    this.activatedRoute.params
    .subscribe(({id})=>{
        this.countriesService.searchCountryByAlphaCode(id)
        .subscribe(
          country => {
            console.log(country);
            
          }
        );
        
      }
    );
  }

}
