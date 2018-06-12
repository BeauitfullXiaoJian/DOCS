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

    get apiForm(): any {
        return this.api.apiForm;
    }

    requestParams: any = {

    };

    responseJson: any = {

    };

    constructor(private api: ApiService) {
        this.resetParam();
    }

    resetParam() {
        const params: any = {};
        this.apiForm.params.forEach(param => {
            params[param.name] = '';
        });
        this.requestParams = params;
    }

    ngOnInit() { }

    addParam() {
        this.apiForm.params.push({ name: '参数名称', type: 'text', required: false, description: '参数的描述信息' });
        this.resetParam();
    }

    removeApi() {
        const index = this.api.apiModel.apiForms.indexOf(this.apiForm);
        if (index >= 0) {
            this.api.apiModel.apiForms.splice(index, 1);
        }
        console.log(index);
    }

    removeParam(index: number) {
        this.apiForm.params.splice(index, 1);
        this.resetParam();
    }

    getJsonHtml(json?: any): string {
        let jsonStr = '';
        if (json) {
            jsonStr = JSON.stringify(json, undefined, 2);
        } else {
            jsonStr = typeof this.responseJson === 'string' ? this.responseJson : JSON.stringify(this.responseJson, undefined, 2);
        }
        return window.Prism.highlight(jsonStr, window.Prism.languages.json, 'json');
    }

    tryApi(successForm: any, errorForm: any, errorFormTwo: any) {
        console.log(this.requestParams);
        this.api.request(this.apiForm.requestMethod, this.apiForm.apiUrl, this.requestParams).subscribe({
            next: (res) => {
                try {
                    this.responseJson = JSON.parse(res);
                } catch (e) {
                    this.responseJson = res;
                }
                successForm.open();
            },
            error: (error) => {
                if (error instanceof HttpErrorResponse) {
                    this.responseJson = error;
                    try {
                        const html = new window.HTMLParser(error.error);
                        const body = html.getElementsByTagName('body')[0];
                        if (body) {
                            this.responseJson.error = html.getElementsByTagName('body')[0].innerHTML;
                            errorForm.open();
                        } else {
                            const jsonStr = JSON.stringify(JSON.parse(this.responseJson.error), undefined, 2);
                            this.responseJson.error = window.Prism.highlight(jsonStr, window.Prism.languages.json, 'json');
                            errorFormTwo.open();
                        }
                    } catch (e) {
                        this.responseJson.error = JSON.stringify(error.error);
                        errorFormTwo.open();
                    }
                } else {
                    console.log(111);
                }
            },
        });
    }
}
