/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import produce from 'immer';
import { take } from 'rxjs';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { flightBookingFeatureKey, FlightBookingSlice } from '../+state/flight-booking.reducer';
import { selectFlights } from '../+state/flight-booking.selectors';

@Component({
  // standalone: true
  // imports: [OtherStandaloneComponent, RouterMoudle.forChild(), lib]
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$ = this.store.select(selectFlights);
  
  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private store: Store<FlightBookingSlice>,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to}));
  }

  delay(): void {

    this.flights$.pipe(take(1)).subscribe(([flight, ]) => {

      const newFlight = produce(flight, draft => {
        draft.date = new Date().toISOString();
      })

      this.store.dispatch(updateFlight({flight: newFlight}));

    })

  }

}

