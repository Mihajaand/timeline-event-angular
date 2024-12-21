import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _host = environment.apiUrl;
    private _table: string = 'table';
    private _orchestratorEndpoint = '/orchestrateur';
    private _tableEndpoint = '/tables';
    private _clientEndpoint = '/clients';
    private _reservationEndpoint = '/reservations';
    private _serviceEndpoint = '/services';
    private _flagEndpoint = '/flags';
    private _evenementEndpoint = '/evenements';
    private _curencyEndpoint = '/curency-rate';
    private _stockEndpoint = '/stocks';
    private _stockEvenementEndpoint = '/stock-evenements';
    private _configurationEndpoint = '/configurations';
    private _employerEndpoint = '/employers';
    private _curentEndpoint = ''

    constructor(private _httpClient: HttpClient) {
    }

    setTable(tablename: string) {
        this._table = tablename;
        switch (this._table) {
            case 'orchestrator':
                this._curentEndpoint = this._host + this._orchestratorEndpoint;
                break;
            case 'table':
                this._curentEndpoint = this._host + this._tableEndpoint;
                break;
            case 'client':
                this._curentEndpoint = this._host + this._clientEndpoint;
                break;
            case 'reservation':
                this._curentEndpoint = this._host + this._reservationEndpoint;
                break;
            case 'service':
                this._curentEndpoint = this._host + this._serviceEndpoint;
                break;
            case 'flag':
                this._curentEndpoint = this._host + this._flagEndpoint;
                break;
            case 'evenement':
                this._curentEndpoint = this._host + this._evenementEndpoint;
                break;
            case 'curency':
                this._curentEndpoint = this._host + this._curencyEndpoint;
                break;
            case 'stock':
                this._curentEndpoint = this._host + this._stockEndpoint;
                break;
            case 'stock-evenement':
                this._curentEndpoint = this._host + this._stockEvenementEndpoint;
                break;
            case 'config':
                this._curentEndpoint = this._host + this._configurationEndpoint;
                break;
            case 'employer':
                this._curentEndpoint = this._host + this._employerEndpoint;
                break;
            default:
                console.error(this._table + " n'est pas valide");
                break;
        }
    }

// Handle errors
    private handleError(error: HttpErrorResponse) {
        // Customize this function to fit your needs
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    getList(table, filters = []): Observable<any> {
        this.setTable(table);
        let filtersArray = [];
        if (filters.length > 0) {
            filters.forEach((obj, key) => {
                filtersArray.push(obj.key + '=' + obj.value);
            });
        }
        return this._httpClient.get<any>(this._curentEndpoint + '?' + filtersArray.join('&'), {responseType: 'json'}).pipe(
            catchError(this.handleError)
        );
    }

    getOne(table, id: number): Observable<any> {
        this.setTable(table);
        return this._httpClient.get(this._curentEndpoint + '/' + id, {responseType: 'json'});
    }

    getOneBy(table, key: string, value: string): Observable<any> {
        this.setTable(table);
        return this._httpClient.get(this._curentEndpoint + '/' + key + '/' + value, {responseType: 'json'});
    }

    add(table, data): Observable<any> {
        this.setTable(table);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._httpClient.post(this._curentEndpoint, data, {headers});
    }

    edit(table, id: number, data): Observable<any> {
        this.setTable(table);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._httpClient.patch(this._curentEndpoint + '/' + id, data, {headers});
    }

    delete(table, id: number): Observable<any> {
        this.setTable(table);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._httpClient.delete(this._curentEndpoint + '/' + id, {headers});
    }
}
