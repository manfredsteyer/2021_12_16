import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import { State } from '../../+state';
import * as FlightBookingActions from './flight-booking.actions';
import { immerOn } from 'ngrx-immer/store';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingSlice {
  [flightBookingFeatureKey]: FlightBookingState
}

// appState.flightBooking

export interface FlightBookingState {
  flights: Flight[];
  basket: unknown;
  stats: unknown;
  invisible: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  stats: {},
  invisible: [4]
};


export const reducer = createReducer(
  initialState,

  immerOn(FlightBookingActions.flightsLoaded, (state, action) => {
    // const flights = action.flights;
    // return { ...state, flights }

    state.flights = action.flights;

  }),

  immerOn(FlightBookingActions.updateFlight, (state, action) => {
    // const flight= action.flight;
    // const flights = state.flights.map(f => f.id !==flight.id ? f : flight )

    const idx = state.flights.findIndex(f => f.id ===  action.flight.id);
    
    state.flights[idx] = action.flight;

    // return { ...state, flights }
  }),


);

