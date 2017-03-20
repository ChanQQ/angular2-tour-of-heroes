import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']

})
export class HeroesComponent implements OnInit{
    //hero array property
    heroes : Hero[];
    //selectedHero
    selectedHero:Hero;

    constructor(private heroService: HeroService,
                private router:Router){}

    getHeroes():void{
        // this.heroes = this.heroService.getHeroes();
        //基于承诺的服务调用
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit():void {
        this.getHeroes();
    }

    onSelect(hero:Hero):void{
        this.selectedHero = hero;
    }

    gotoDetail():void{
        this.router.navigate(['/detail',this.selectedHero.id]);
    }

}


