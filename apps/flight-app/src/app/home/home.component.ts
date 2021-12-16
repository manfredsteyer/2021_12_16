/* eslint-disable no-restricted-syntax */
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  _userName = '';


  @ViewChild('placeholder', { read: ViewContainerRef })
  placeholder!: ViewContainerRef;


  get userName(): string {
    return this._userName;
  }

  constructor(
    private cfr: ComponentFactoryResolver,
    private route: ActivatedRoute) {


  }

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  async ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );

    const comp = await (await import('../about/about.component')).AboutComponent;


    const ref = this.placeholder.createComponent(this.cfr.resolveComponentFactory(comp))
    
    // Angular 13:
    // const ref = this.placeholder.createComponent(comp)
    
    const compInstance = ref.instance;
    // compInstance.ngOnInit();

  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }
}
