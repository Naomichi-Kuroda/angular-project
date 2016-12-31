import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TowerService } from "../../services/tower.service";

@Component({
    selector: 'tower-list',
    templateUrl: './tower-list.component.html',
})
export class TowerListComponent implements OnInit {

    @Output() selectTowerId: EventEmitter<string> = new EventEmitter<string>();
    towerList: any;
    jsonGetBody: any;

    constructor(
        private towerService: TowerService,
    ) { }

    ngOnInit() {
        this.getTowerList();
    }

    getTowerList() {
        this.towerService.index().subscribe(
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

    onTowerId(towerId) {
        this.selectTowerId.emit(towerId);
    }

}
