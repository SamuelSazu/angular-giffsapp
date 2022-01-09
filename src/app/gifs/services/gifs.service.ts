import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsReponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'L1VzK2Nwf6NFPD7GLZjLm3Ccy8LGJftc';
  private _historial:string[]=[];

  public resultados:Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor (private http:HttpClient){}

  buscarGifs(query:string=''){

    query=query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10);
    };

    this.http.get<SearchGifsReponse>(`https://api.giphy.com/v1/gifs/search?api_key=L1VzK2Nwf6NFPD7GLZjLm3Ccy8LGJftc&q=${query}&limit=10`)
            .subscribe((resp:any)=>{
              console.log(resp.data);
              this.resultados=resp.data;

            });
    
  }
}
