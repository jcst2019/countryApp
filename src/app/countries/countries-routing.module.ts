import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/pages/country-page/country-page.component';

const routes:Routes =[
    {
        path:'by-capital',
        component:ByCapitalPageComponent
    },    
    {
        path:'by-country',
        component:ByCountryPageComponent
    },    
    {
        path:'by-region',
        component:ByRegionPageComponent
    },    
    {
        path:'by/:id',
        component:CountryPageComponent
    },
    {
        path:'**',
        // redirectTo:'countries/by-capital'
        redirectTo:'by-capital'
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class CountriesRoutingModule { }
