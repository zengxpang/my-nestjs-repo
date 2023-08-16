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
const svgCaptcha = require("svg-captcha");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    createCaptcha(req, res) {
        const captcha = svgCaptcha.createMathExpr({
            size: 4,
            fontSize: 30,
            width: 100,
            height: 30,
            background: '#cc9966',
        });
        req.session.captcha = captcha.text;
        res.type('image/svg+xml');
        res.send(captcha.data);
    }
    login(body, session) {
        const { username, password, captcha } = body;
        if (captcha.toLowerCase() !== session.captcha.toLowerCase()) {
            return {
                code: 400,
                msg: '验证码错误',
            };
        }
        else {
            return {
                code: 200,
                msg: '登录成功',
            };
        }
    }
};
__decorate([
    (0, common_1.Get)('captcha'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCaptcha", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
AppController = __decorate([
    (0, common_1.Controller)({
        version: '1',
        path: 'app',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map