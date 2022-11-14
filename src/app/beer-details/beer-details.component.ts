import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerAPIService } from '../beer-api.service';
import { Beer } from '../beer.type';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss'],
})
export class BeerDetailsComponent implements OnInit {
  currentBeer: Beer;
  similarBeers: Beer[];
  constructor(
    private activeRoute: ActivatedRoute,
    private beerAPI: BeerAPIService,
    public checkout:CheckoutService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      this.beerAPI.getByID(id).subscribe((beer) => {

        this.beerAPI.getSimilars(beer).subscribe((beers) => {
          
          this.currentBeer = beer;
          this.similarBeers = beers;
        });
      });
    })
  }
}
