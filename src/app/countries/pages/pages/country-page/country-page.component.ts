import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?:Country; // En un punto del tiempo es nullo por ello coloco ?

  constructor(
    private  activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService:CountriesService,
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
    // this.activatedRoute.params
    // .subscribe(({id})=>{
    //     this.countriesService.searchCountryByAlphaCode(id)
    //     .subscribe(
    //       country => {
    //         console.log(country);
            
    //       }
    //     );
        
    //   }
    // );
   //Cuarta Forma Refactorizada
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe(country =>{
        console.log(country);
        if(!country)  return this.router.navigateByUrl('');
        return this.country= country;
        // return;
      }
    );
  }

}
