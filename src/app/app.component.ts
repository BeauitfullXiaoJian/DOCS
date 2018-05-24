import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        public api: ApiService,
        public router: Router,
    ) {

    }

    public ngOnInit() {

    }

    openApi(model: any, apiForm: any) {
        this.api.apiModel = model;
        this.api.apiForm = apiForm;
        this.router.navigateByUrl('/home');
    }

    saveDocs() {
        this.api.saveDocs();
    }

    addModel() {

    }

    addApi() {
        this.api.apiModel.apiForms.push({
            requestMethod: 'get',
            apiName: '新增接口',
            apiUrl: '/test',
            apiDescription: '接口描述信息',
            params: []
        });
    }
}
