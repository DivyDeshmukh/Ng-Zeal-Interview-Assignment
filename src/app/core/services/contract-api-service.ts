import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contract, ContractsPage, ContractSummary, ListQuery } from "../../models/contracts/contracts.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ContractApiService {
    constructor(private http: HttpClient) {}    

    list(q: ListQuery): Observable<ContractsPage> {
        let params = new HttpParams();
        if(q.q) params = params.set('q', q.q);
        if(q.party) params = params.set('party', q.party);
        if(q.status?.length) params = params.set('status', q.status.join(','));
        if (q.expiringDays != null) params = params.set('expiringDays', String(q.expiringDays)); 
        if(q.page != null) params = params.set('page', String(q.page));
        if(q.size != null) params = params.set('size', String(q.size));
        if(q.sort) params = params.set('sort', q.sort);

        return this.http.get<ContractsPage>('/api/contracts', { params });
    }

    byId(id: string): Observable<Contract> {
        return this.http.get<Contract>(`/api/contracts/${id}`);
    }

    summary(): Observable<ContractSummary> {
        return this.http.get<ContractSummary>('/api/contracts/summary');
    }
}
