import { Component } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { CountriesService } from '../../../services/countries.service';


type Region ='Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries : Country[]=[];
  // public regions: string[]=['Africa','Americas','Asia','Europe','Oceania'];
  public regions: Region[]=['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService:CountriesService){

  }

  searchByRegion(region:Region):void{
    this.selectedRegion=region;
    console.log('Desde By Country Page');
    console.log({region});
    this.countriesService.searchRegion(region).subscribe(
      countries =>{
          this.countries = countries;
      }
    );

  }

}
