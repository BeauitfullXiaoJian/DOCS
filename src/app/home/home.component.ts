import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
declare const window: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



    requestColors = {
        'get': 'skyblue',
        'post': 'green',
        'put': 'blue',
        'delete': 'red'
    };

    apiForm = {
        requestMethod: 'get',
        apiName: '测试接口',
        apiUrl: '/tools/test',
        apiDescription: '接口描述信息',
        params: [
            { name: 'a', type: 'text', required: true, description: '参数1' },
            { name: 'b', type: 'text', required: true, description: '参数2' },
        ]
    };

    requestParams: any = {

    };

    responseJson: any = {};

    constructor(private api: ApiService) {
        this.resetParam();
    }

    resetParam() {
        const params: any = {};
        this.apiForm.params.forEach(param => {
            params[param.name] = '';
        });
        this.removeParam = params;
    }

    ngOnInit() { }

    addParam() {
        this.apiForm.params.push({ name: '参数名称', type: 'text', required: false, description: '参数的描述信息' });
        this.resetParam();
    }

    removeParam(index: number) {
        this.apiForm.params.splice(index, 1);
        this.resetParam();
    }

    getJsonHtml(): string {
        // this.responseJson = this.apiForm;
        const jsonStr = JSON.stringify(this.responseJson, undefined, 2);
        return window.Prism.highlight(jsonStr, window.Prism.languages.json, 'json');
    }

    tryApi(successForm: any, errorForm: any) {
        console.log(this.requestParams);
        this.api.get(this.apiForm.apiUrl, this.requestParams).subscribe({
            next: (res) => {
                this.responseJson = res;
                successForm.open();
            },
            error: (error) => {
                if (error instanceof HttpErrorResponse) {
                    this.responseJson = error;
                }
                errorForm.open();
            },
        });
    }
}
