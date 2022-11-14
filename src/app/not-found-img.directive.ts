import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "img"
})
export class NotFoundImgDirective {
  @HostListener("error", ["$event.target"])
  onError(host: HTMLImageElement) {
    host.src = "/assets/not-found.png";
  }
}
