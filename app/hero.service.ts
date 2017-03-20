import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
// import { InMemoryDataService } from './in-memory-data.service';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

// import { HEROES } from './mock-heroes';
// import {resolve} from "url";

@Injectable()
export class HeroService {

    /*服务的一般写法
    getHeroes(): Hero[]{
        return HEROES;
    }*/
    private heroesUrl = 'app/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    //基于承诺的异步服务，延迟2秒获取数据
    getHeroesslowly():Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve,2000))
            .then(() => this.getHeroes());

    }
    //通过id获取详情的方法
    getHero(id:number):Promise<Hero>{
        return this.getHeroes()
                   .then(heroes => heroes.find(hero => hero.id === id));
    }
    private headers = new Headers({'Content-Type':'application/json'});
    update(hero:Hero):Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url,JSON.stringify(hero),{headers:this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
}