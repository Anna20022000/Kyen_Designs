import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base-component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  public id:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    window.scroll(0,0);
    this.route.params.subscribe(params => {
      this.id = params['id'];  
    });
  }

  ngAfterViewInit() { 
    this.loadScripts(); 
   } 
}
