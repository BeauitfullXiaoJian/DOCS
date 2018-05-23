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
        apiUrl: '/managerapi/permission/all',
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

    getJsonHtml(json?: any): string {
        const jsonStr = JSON.stringify(json || this.responseJson, undefined, 2);
        return window.Prism.highlight(jsonStr, window.Prism.languages.json, 'json');
    }

    tryApi(successForm: any, errorForm: any) {
        console.log(this.requestParams);
        this.api.request(this.apiForm.requestMethod, this.apiForm.apiUrl, this.requestParams).subscribe({
            next: (res) => {
                this.responseJson = res;
                successForm.open();
            },
            error: (error) => {
                if (error instanceof HttpErrorResponse) {
                    this.responseJson = error;
                    const html = new window.HTMLParser(error.error);
                    const body = html.getElementsByTagName('body')[0];
                    if (body) {
                        this.responseJson.error = html.getElementsByTagName('body')[0].innerHTML;
                    }
                }
                errorForm.open();
            },
        });
    }
}
