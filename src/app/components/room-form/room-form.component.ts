import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'room-form',
    templateUrl: './room-form.component.html',
    styles: [`
        li { 
            display: inline-block;
            padding: 3px 6px;
            margin: 0 5px;
            background-color: #4285f4;
            color: #FFFFFF;
            font-size: 10px;
            border-radius: 4px;
            box-shadow: 1.5px 1.5px 0 0 rgba(0,0,0,0.15) inset;
            text-shadow: 0 -1px 0 rgba(0,0,0,0.3);
        }
        span.tag {
            font-size: 12px;
            margin-right: 3px;
        }
    `]
})
export class RoomFormComponent implements OnInit {

    @Output() rooms: EventEmitter<any> = new EventEmitter<any>();
    tags: Array<string>;
    current: string;

    constructor() { }

    ngOnInit() {
        this.current = '';
        this.tags= [];
    }

    keyUp(event:KeyboardEvent) {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if (event.ctrlKey && charCode === 'v') {
            var array = this.current.split(/[ .:;?!~,`"&|()<>{}\[\]\t\r\n/\\]+/);
            for (var k in array) {
                if(array[k]){
                    array[k] = array[k].replace(/(^\s+)|(\s+$)/g, "");
                    this.tags.push(array[k]);
                }
            }
            this.setTags();
        }

        if (event.keyCode === 32 && this.current.match(/\S/g)) {
            this.current = this.current.replace(/\s+$/, "");
            this.tags.push(this.current);
            this.setTags();
        }
    }

    blur() {
        if (this.current.match(/\S/g)) {
            this.current = this.current.replace(/\s+$/, "");
            this.tags.push(this.current);
            this.setTags();
        }
    }

    setTags() {
        this.current = '';
        this.checkDuplication();
        this.sortAsc();
        this.rooms.emit(this.tags);
    }

    removeTag(i) {
        this.tags.splice(i, 1);
        this.setTags();
    }

    reset() {
        this.tags.length = 0;
        this.rooms.emit(this.tags);
    }

    checkDuplication() {
        this.tags = this.tags.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    }

    sortAsc() {
        this.tags.sort(function(a,b){
            if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
        });
    }
}
