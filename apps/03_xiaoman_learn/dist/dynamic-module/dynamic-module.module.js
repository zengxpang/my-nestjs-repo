"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicModuleModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicModuleModule = void 0;
const common_1 = require("@nestjs/common");
const dynamic_module_service_1 = require("./dynamic-module.service");
const dynamic_module_controller_1 = require("./dynamic-module.controller");
let DynamicModuleModule = DynamicModuleModule_1 = class DynamicModuleModule {
    static register(options) {
        return {
            module: DynamicModuleModule_1,
            controllers: [dynamic_module_controller_1.DynamicModuleController],
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options,
                },
                dynamic_module_service_1.DynamicModuleService,
            ],
            exports: [],
        };
    }
};
DynamicModuleModule = DynamicModuleModule_1 = __decorate([
    (0, common_1.Module)({})
], DynamicModuleModule);
exports.DynamicModuleModule = DynamicModuleModule;
//# sourceMappingURL=dynamic-module.module.js.map