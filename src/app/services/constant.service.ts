import { Injectable } from '@angular/core';
import { ToastsManager, Toast } from "ng2-toastr";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Injectable()
export class ConstantService {

    APP_NAME: string;
    API_ENDPOINT: string;
    PREFECTURES: Array<any>;
    SECOND_DISPLAY_TOAST: number;
    DATE_FORMAT: string;
    USER_STATUS: Array<any>;
    ROLE_MANAGE: Array<any>;
    ROLE_CONTENT: Array<any>;
    ROLE_RESIDENCE: Array<any>;

    constructor(
        private router: Router,
    ) {
        this.APP_NAME = "Angular";
        this.API_ENDPOINT = "http://127.0.0.1:8000/api/";
        this.PREFECTURES = [{ id: 1, value: "北海道" },{ id: 2, value: "青森県" },{ id: 3, value: "岩手県" },{ id: 4, value: "宮城県" },{ id: 5, value: "秋田県" },{ id: 6, value: "山形県" },{ id: 7, value: "福島県" },{ id: 8, value: "茨城県" },{ id: 9, value: "栃木県" },{ id: 10, value: "群馬県" },{ id: 11, value: "埼玉県" },{ id: 12, value: "千葉県" },{ id: 13, value: "東京都" },{ id: 14, value: "神奈川県" },{ id: 15, value: "新潟県" },{ id: 16, value: "富山県" },{ id: 17, value: "石川県" },{ id: 18, value: "福井県" },{ id: 19, value: "山梨県" },{ id: 20, value: "長野県" },{ id: 21, value: "岐阜県" },{ id: 22, value: "静岡県" },{ id: 23, value: "愛知県" },{ id: 24, value: "三重県" },{ id: 25, value: "滋賀県" },{ id: 26, value: "京都府" },{ id: 27, value: "大阪府" },{ id: 28, value: "兵庫県" },{ id: 29, value: "奈良県" },{ id: 30, value: "和歌山県" },{ id: 31, value: "鳥取県" },{ id: 32, value: "島根県" },{ id: 33, value: "岡山県" },{ id: 34, value: "広島県" },{ id: 35, value: "山口県" },{ id: 36, value: "徳島県" },{ id: 37, value: "香川県" },{ id: 38, value: "愛媛県" },{ id: 39, value: "高知県" },{ id: 40, value: "福岡県" },{ id: 41, value: "佐賀県" },{ id: 42, value: "長崎県" },{ id: 43, value: "熊本県" },{ id: 44, value: "大分県" },{ id: 45, value: "宮崎県" },{ id: 46, value: "鹿児島県" },{ id: 47, value: "沖縄県" }];
        this.SECOND_DISPLAY_TOAST = 3000;
        this.DATE_FORMAT = "yyyyMMdd";
        this.USER_STATUS = [{ id: 1, value: "未登録" },{ id: 2, value: "メール送信済" },{ id: 3, value: "登録済" },{ id: 4, value: "入居済" },]
        this.ROLE_MANAGE = [{ id: 1, value: "アカウント管理", checked: false },{ id: 2, value: "物件管理", checked: false }]
        this.ROLE_CONTENT = [{ id: 1, value: "お知らせ", checked: false },{ id: 2, value: "お困りごと", checked: false }]
        this.ROLE_RESIDENCE = [{ id: 1, value: "物件全て", checked: false }]
    }

    hasError(error) {
        if (error.status.code < 200 || error.status.code >= 400) {
            this.router.navigate([ '/error/' + error.status.code + '/' + error.status.message ]);
        } else {
            return error.result;
        }
    }

    transformDate(date: Date):string {
        var d = new DatePipe('ja-JP').transform(date, this.DATE_FORMAT);
        return d;
    }

    convertObjectToArray(obj: Array<any>) {
        var array = [];
        for (var k in obj) {
            array[obj[k].id] = obj[k].value;
        }
        return array
    }
}
