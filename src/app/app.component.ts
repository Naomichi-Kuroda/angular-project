import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
    }

}
