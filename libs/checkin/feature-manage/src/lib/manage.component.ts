import { Component, OnInit} from '@angular/core';
import { ManageFacade, loadTicket } from '@flight-workspace/checkin/domain';

@Component({
  selector: 'checkin-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
    
    
    ticketList$ = this.manageFacade.ticketList$;


    constructor(private manageFacade: ManageFacade) {
    }

    
    ngOnInit() {
        this.load();
    }

    load(): void {
        this.manageFacade.dispatch(loadTicket());
    }

}

