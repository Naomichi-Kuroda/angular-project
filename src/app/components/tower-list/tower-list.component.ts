import { Component, OnInit } from '@angular/core';
import { TowerService } from "../../services/tower.service";

@Component({
    selector: 'tower-list',
    templateUrl: './tower-list.component.html',
})
export class TowerListComponent implements OnInit {

    towerList: any;
    jsonGetBody: any;

    constructor(
        private towerService: TowerService,
    ) { }

    ngOnInit() {
        this.getTowerList();
    }

    getTowerList() {
        this.towerService.getAll().subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setTowerList();
            }
        );
    }

    setTowerList() {
        this.towerList = this.jsonGetBody.towerList;
    }

}
