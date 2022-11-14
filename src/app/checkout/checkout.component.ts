import { Component, OnInit } from "@angular/core";
import { BeerAPIService } from "../beer-api.service";
import { Beer } from "../beer.type";
import { CheckoutService } from "../checkout.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  beers: Beer[];

  constructor(public checkout: CheckoutService, private beerAPI: BeerAPIService) {}

  ngOnInit(): void {
    this.beerAPI.getByIDs(Object.keys(this.checkout.card)).subscribe((beers) => {
      this.beers = beers;
    });
  }

  remove(beer: Beer) {
    this.checkout.remove(beer);
    this.beers.splice(this.beers.indexOf(beer), 1);
  }
}
