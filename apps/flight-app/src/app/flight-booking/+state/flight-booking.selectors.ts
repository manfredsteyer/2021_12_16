import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { flightBookingFeatureKey, FlightBookingSlice, FlightBookingState } from './flight-booking.reducer';


// AppState --> flightBooking

export const selectFlightBookingState = createFeatureSelector<FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectAllFlights = createSelector(
  selectFlightBookingState,
  (flightBookingState) => flightBookingState.flights
);

// export const selectFlights = 
//   (appState: FlightBookingSlice) => appState[flightBookingFeatureKey].flights;

export const selectFlights = createSelector(
  selectAllFlights,
  (appState: FlightBookingSlice) => appState[flightBookingFeatureKey].invisible,
  (flights, invisible) => flights.filter(f => !invisible.includes(f.id)) 
);

export const selectFlightsWithParam = (invisible: number[]) => {
  return createSelector(
    (appState: FlightBookingSlice) => appState[flightBookingFeatureKey].flights,
    (flights) => flights.filter(f => !invisible.includes(f.id)) 
  );
}