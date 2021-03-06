import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

    // 文档树
    apiDocs = {
        apiTitle: 'API-DOCS',
        apiHost: 'http://127.0.0.1',
        apiHeaders: [
            'ng-params-one',
            'ng-params-two',
            'ng-params-three',
        ],
        apiModels: [
            {
                modelTitle: '商品模块',
                apiForms: [
                    {
                        requestMethod: 'get',
                        apiName: '测试接口',
                        apiUrl: '/tooltest/form',
                        apiDescription: '接口描述信息',
                        params: [
                            { name: 'a', type: 'text', required: true, description: '参数1' },
                            { name: 'b', type: 'text', required: true, description: '参数2' },
                        ]
                    },
                    {
                        requestMethod: 'post',
                        apiName: '其他接口',
                        apiUrl: '/goods/test',
                        apiDescription: '接口描述信息',
                        params: [
                            { name: 'c', type: 'text', required: true, description: '参数1' },
                            { name: 'd', type: 'text', required: true, description: '参数2' },
                        ]
                    }
                ]
            }
        ]
    };

    apiModel = {
        modelTitle: '商品模块',
        apiForms: [
            {
                requestMethod: 'get',
                apiName: '测试接口',
                apiUrl: '/tools/test',
                apiDescription: '接口描述信息',
                params: [
                    { name: 'a', type: 'text', required: true, description: '参数1' },
                    { name: 'b', type: 'text', required: true, description: '参数2' },
                ]
            },
            {
                requestMethod: 'post',
                apiName: '其他接口',
                apiUrl: '/goods/test',
                apiDescription: '接口描述信息',
                params: [
                    { name: 'c', type: 'text', required: true, description: '参数1' },
                    { name: 'd', type: 'text', required: true, description: '参数2' },
                ]
            }
        ]
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

    constructor(private http: HttpClient) { }

    saveDocs() {
        localStorage.setItem('apiDocs', JSON.stringify(this.apiDocs));
    }

    loadDocs() {

    }

    request(method: string, url: string, params: { [key: string]: any }): Observable<string> {
        return this.http.request(
            method, this.apiDocs.apiHost + url,
            {
                headers: this.getHeaders(),
                params: this.getParams(params),
                responseType: 'text',
            });
    }

    private getHeaders(): HttpHeaders {
        let header = new HttpHeaders();
        this.apiDocs.apiHeaders.forEach(key => {
            header = header.append(key, localStorage.getItem(key) || '');
        });
        return header;
    }

    private getParams(params: { [key: string]: number | string }): HttpParams {
        params = JSON.parse(JSON.stringify(params));
        let httpParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined && params[key] !== '') {
                if (typeof params[key] === 'number') {
                    params[key] = params[key].toString();
                }
                httpParams = httpParams.append(key, <string>params[key]);
            }
        }
        return httpParams;
    }
}
