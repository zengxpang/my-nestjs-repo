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
exports.DynamicModuleController = void 0;
const common_1 = require("@nestjs/common");
const dynamic_module_service_1 = require("./dynamic-module.service");
const create_dynamic_module_dto_1 = require("./dto/create-dynamic-module.dto");
const update_dynamic_module_dto_1 = require("./dto/update-dynamic-module.dto");
let DynamicModuleController = class DynamicModuleController {
    constructor(dynamicModuleService, configOptions) {
        this.dynamicModuleService = dynamicModuleService;
        this.configOptions = configOptions;
    }
    create(createDynamicModuleDto) {
        return this.dynamicModuleService.create(createDynamicModuleDto);
    }
    findAll() {
        console.log('configOptions', this.configOptions);
        return this.dynamicModuleService.findAll();
    }
    findOne(id) {
        return this.dynamicModuleService.findOne(+id);
    }
    update(id, updateDynamicModuleDto) {
        return this.dynamicModuleService.update(+id, updateDynamicModuleDto);
    }
    remove(id) {
        return this.dynamicModuleService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dynamic_module_dto_1.CreateDynamicModuleDto]),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dynamic_module_dto_1.UpdateDynamicModuleDto]),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "remove", null);
DynamicModuleController = __decorate([
    (0, common_1.Controller)({
        version: '1',
        path: 'dynamic-module',
    }),
    __param(1, (0, common_1.Inject)('CONFIG_OPTIONS')),
    __metadata("design:paramtypes", [dynamic_module_service_1.DynamicModuleService, Object])
], DynamicModuleController);
exports.DynamicModuleController = DynamicModuleController;
//# sourceMappingURL=dynamic-module.controller.js.map