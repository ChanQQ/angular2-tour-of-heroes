import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    moduleId:module.id,
    selector:'my-dashboard',
    templateUrl:'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    heroes: Hero[] = [];
    //构造函数
    constructor(
        private  heroService : HeroService,
        private  router      : Router
    ){}
    ngOnInit():void{
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1,5));
    }

    gotoDetail(hero:Hero):void{
        let link = ['/detail',hero.id];//生成路由的链接参数数组
        this.router.navigate(link);//传参

    }
}