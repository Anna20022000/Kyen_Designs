import { Injector, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { CartServiceService } from "./cart-service.service";
import { map } from 'rxjs/operators';
import { of as observableOf, fromEvent, Subject } from 'rxjs';
import { CategoryService } from "../services/category.service";


export class BaseComponent {
  public route: ActivatedRoute;
  public renderer: Renderer2;
  public _cart: CartServiceService;
  public _route: ActivatedRoute;

  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.renderer = injector.get(Renderer2);
    this._cart = injector.get(CartServiceService);
    this._route = injector.get(ActivatedRoute);
  }


  public loadScripts() {
    this.renderExternalScript('assets/js/main.js').onload = () => { }
    this.renderExternalScript('assets/js/demos/demo-8.js').onload = () => { }
  }
  
  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

}
