import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as fromTicket from '../+state/ticket/ticket.reducer';
import * as TicketSelectors from '../+state/ticket/ticket.selectors';
import { loadTicket, loadTicketSuccess, Ticket, TicketDataService } from '../..';

@Injectable({ providedIn: 'root' })
export class ManageFacade {
  loaded$ = this.store.pipe(select(TicketSelectors.getTicketLoaded));
  ticketList$ = this.store.pipe(select(TicketSelectors.getAllTicket));
  selectedTicket$ = this.store.pipe(select(TicketSelectors.getSelected));

  constructor(private store: Store<fromTicket.TicketPartialState>) { }

  load() {
    this.store.dispatch(loadTicket());
  }
}

// -- 3 --
// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   ticketList$ = this.store.select(TicketSelectors.getAllTicket)

//   constructor(
//     private ticketDataService: TicketDataService,
//     private store: Store<fromTicket.TicketPartialState>
//     ) { }

//   load() {
//     this.ticketDataService.load().subscribe(
//       ticket => {

//         this.store.dispatch(loadTicketSuccess({ticket}))

//       }
//     );
//   }
// }

// -- 2 --
// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   ticketList$ = this.store.select(a => a[fromTicket.TICKET_FEATURE_KEY].entities)

//   constructor(
//     private ticketDataService: TicketDataService,
//     private store: Store<fromTicket.TicketPartialState>
//     ) { }

//   load() {
//     this.ticketDataService.load().subscribe(
//       ticket => {

//         this.store.dispatch(loadTicketSuccess({ticket}))

//       }
//     );
//   }
// }

// -- 1 --
// @Injectable({ providedIn: 'root' })
// export class ManageFacade {
//   private tickets = new BehaviorSubject<Ticket[]>([]);
//   ticketList$ = this.tickets.asObservable();

//   constructor(private ticketDataService: TicketDataService) { }

//   load() {
//     this.ticketDataService.load().subscribe(
//       tickets => this.tickets.next(tickets)
//     );
//   }
// }