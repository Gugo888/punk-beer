import { Component } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public checkout: CheckoutService) { }
}
