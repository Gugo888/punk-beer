import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BeerAPIService } from "../beer-api.service";
import { Beer, QueryParams } from "../beer.type";
import { CheckoutService } from "../checkout.service";

@Component({
  selector: "app-beer-list",
  templateUrl: "./beer-list.component.html",
  styleUrls: ["./beer-list.component.scss"]
})
export class BeerListComponent implements OnInit {
  beers: Beer[];
  pageSize = 9;
  isLoading = false;

  filters = new FormGroup({
    beer_name: new FormControl(""),
    brewed_after: new FormControl(""),
    brewed_before: new FormControl(""),
  });

  @ViewChild("scroll_container", { read: ElementRef , static: true})
  scrollContainer: ElementRef<HTMLDivElement>;

  constructor(private beerAPI: BeerAPIService, public checkout: CheckoutService) {}

  ngOnInit(): void {
    this.loadBeers({});
    
    this.filters.valueChanges.subscribe((params) => {
      this.loadBeers(params);
    });
  }
  
  loadBeers(filterParams: QueryParams) {
    this.scrollContainer.nativeElement.scrollTo(0,0);

    this.beerAPI.load({ page: 1, per_page: this.pageSize * 2, ...filterParams }).subscribe((items) => {
      this.beers = items;
    });
  }

  loadMoreBeers(filterParams: QueryParams) {
    if (this.isLoading || this.isAllLoaded) {
      return;
    }

    this.isLoading = true;
    const currentPage = this.beers.length / this.pageSize;

    this.beerAPI.load({ page: currentPage + 1, per_page: this.pageSize, ...filterParams }).subscribe((beers) => {
      this.isLoading = false;
      this.beers = this.beers.concat(beers);
    });
  }

  onScroll() {
    const { scrollHeight, scrollTop, clientHeight } = this.scrollContainer.nativeElement;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 100;
    if (isScrolledToBottom) {
      this.loadMoreBeers(this.filters.value);
    }
  }

  get isAllLoaded(): boolean {
    return this.beers.length % this.pageSize > 0;
  }
}
