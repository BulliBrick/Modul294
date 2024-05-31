import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { KundenService } from './kunden.service';
import { Kunden } from '../data/kunden';

describe('KundenService', () => {
  let service: KundenService;
  let httpSpy: Spy<HttpClient>;

  const fakeKundens: Kunden[] = [
    {
      id: 1,
      name: 'Josh1',
      vorname: 'Kunz1',
      kundennummer: 1
    },
    {
        id: 2,
        name: 'Josh2',
        vorname: 'Kunz2',
        kundennummer: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(KundenService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of kundens', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeKundens);

    service.getList().subscribe({
      next:
        kundenData => {
          expect(kundenData).toHaveSize(fakeKundens.length);
          done();
        },
      error: done.fail
    }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new kunden', (done: DoneFn) => {

    const newKunden: Kunden = {
        id: 3,
        name: 'Josh3',
        vorname: 'Kunz3',
        kundennummer: 3
    };

    httpSpy.post.and.nextWith(newKunden);

    service.save(newKunden).subscribe({
      next: kunden => {
        expect(kunden).toEqual(newKunden);
        done();
      },
      error: done.fail
    }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an kunden', (done: DoneFn) => {

    const kunden = fakeKundens[0];
    kunden.name = 'Updated Kunden';

    httpSpy.put.and.nextWith(kunden);

    service.update(kunden).subscribe({
      next: kunden => {
        expect(kunden.name).toEqual('Updated Kunden');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing kunden', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});