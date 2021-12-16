import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, combineLatest, concatMap, delay, exhaustMap, interval, mergeMap, Observable, of, share, shareReplay, Subject, Subscriber, Subscription, take, takeUntil, withLatestFrom } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, filter, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {

    control!: FormControl;
    flights$!: Observable<Flight[]>;
    loading = false;

    loading$ = new BehaviorSubject<boolean>(false);

    online$!: Observable<boolean>;

    exitSubject = new Subject<void>();


    constructor(private http: HttpClient) {
    }
    ngOnDestroy(): void {
        this.exitSubject.next();
        this.exitSubject.complete();
    }

    ngOnInit() {
        this.control = new FormControl();

        // Cold Observables
        this.online$ 
            = interval(2000).pipe(
                    startWith(-1),
                    tap(value => console.log('value', value)),
                    map(_ => Math.random() < 0.5), // f, f, t, t, f
                    // map(_ => true),
                    // distinctUntilChanged(), // f, t, f
                    shareReplay({bufferSize: 1, refCount: true}),
            );

        this.online$.pipe(takeUntil(this.exitSubject)).subscribe(counter => {
            console.log('counter', counter);
        })

        // Service (Use Case) Facade
        //   vvv
        // DataService

        const input$ =  this.control.valueChanges.pipe(
            filter(input => input.length >= 3),
            debounceTime(300),
            //
        );

        // RxJS 7: Angular 13 (Angular 12.2 opt-in)
        this.flights$ = combineLatest({input: input$, online: this.online$}).pipe(
            filter(c => c.online),
            map(c => c.input),
            // distinctUntilChanged((p, c) => c !== p),
            // Seiteneffekt ?!
            tap(() => this.loading$.next(true)),
            switchMap(name => this.load(name)),
            tap(() => this.loading$.next(false))
        );





        // sub.unsubscribe();

        // // RxJS 7: Angular 13 (Angular 12.2 opt-in)
        // const filteredInput$ = combineLatest({input: input$, online: this.online$}).pipe(
        //     filter(c => c.online),
        //     map(c => c.input),
        // );
        
        // this.flights$ = filteredInput$.pipe(
        //     tap(() => this.loading$.next(true)),
        //     switchMap(name => this.load(name)),
        //     tap(() => this.loading$.next(false))
        // )

        // this.flights$ = input$.pipe(
        //     withLatestFrom(this.online$),
        //     filter(([, online]) => online),
        //     map(([input, ]) => input),
        //     // Seiteneffekt ?!
        //     tap(v => this.loading = true),
        //     switchMap(name => this.load(name)),
        //     tap(v => this.loading = false)
        // );


    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            catchError(err => {
                console.error('err', err);
                return of([]);
            }))

    };


}
