"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
const ccc_dto_1 = require("./dto/ccc.dto");
const ccc_vo_1 = require("./vo/ccc.vo");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    aaa(a1, a2) {
        console.log(a1, a2);
        return `aaa success,a1=${a1},a2=${a2}`;
    }
    bbb(id) {
        return `bbb success ${id}`;
    }
    ccc(ccc) {
        const vo = new ccc_vo_1.CccVo();
        vo.aaa = 111;
        vo.bbb = 222;
        return vo;
    }
};
__decorate([
    (0, swagger_1.ApiTags)('xxx-get'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('bearer'),
    (0, swagger_1.ApiTags)('xxx-get'),
    (0, swagger_1.ApiOperation)({ summary: '测试aaa', description: 'aaa描述' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'aaa成功', type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'a1',
        type: String,
        description: 'a1 params',
        required: false,
        example: '111',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'a2',
        type: String,
        description: 'a2 params',
        required: true,
        example: '222',
    }),
    (0, common_1.Get)('aaa'),
    __param(0, (0, common_1.Query)('a1')),
    __param(1, (0, common_1.Query)('a2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "aaa", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('cookie'),
    (0, swagger_1.ApiTags)('xxx-get'),
    (0, swagger_1.ApiOperation)({ summary: '测试bbb', description: 'bbb描述' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'bbb成功', type: String }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'id不合法' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'id params',
        required: true,
        example: '111',
        type: String,
    }),
    (0, common_1.Get)('bbb/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "bbb", null);
__decorate([
    (0, swagger_1.ApiBasicAuth)('basic'),
    (0, swagger_1.ApiTags)('xxx-post'),
    (0, swagger_1.ApiOperation)({ summary: '测试ccc', description: 'ccc描述' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'ccc成功', type: ccc_vo_1.CccVo }),
    (0, swagger_1.ApiBody)({ type: ccc_dto_1.CccDto }),
    (0, common_1.Post)('ccc'),
    __param(0, (0, common_1.Body)('ccc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ccc_dto_1.CccDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ccc", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('xxx'),
    (0, common_1.Controller)('xxx'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map