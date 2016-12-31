import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TowerService } from "../../services/tower.service";

@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
})
export class RoomListComponent implements OnInit, OnChanges {

    @Input() towerId: string;
    @Output() selectRoomId: EventEmitter<string> = new EventEmitter<string>();
    roomList: any;

    jsonGetBody: any;

    constructor(
        private towerService: TowerService,
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.towerId = changes['towerId'].currentValue;
        if(this.towerId) {
            this.getRoomList();
        }
    }

    getRoomList() {
        this.towerService.indexRooms(this.towerId).subscribe(
            res => {
                this.jsonGetBody = res.result;
            },
            error => {
                console.log(error);
            },
            () => {
                this.setRoomList();
            }
        );
    }

    setRoomList() {
        this.roomList = this.jsonGetBody.roomList;
    }

    onRoomId(roomId) {
        this.selectRoomId.emit(roomId);
    }

}
