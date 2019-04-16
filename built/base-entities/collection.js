"use strict";
// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const byIndexedWebElementLocator_1 = require("./locators/byIndexedWebElementLocator");
const byFilteredWebElementsLocator_1 = require("./locators/byFilteredWebElementsLocator");
const element_1 = require("./element");
const wait_1 = require("../wait");
const byWebElementsLocator_1 = require("./locators/byWebElementsLocator");
const condition_1 = require("../conditions/condition");
const utils_1 = require("../utils");
const __1 = require("..");
const assertionHook_1 = require("./assertionHook");
class Collection {
    constructor(locator) {
        this.locator = locator;
    }
    async should(condition, timeout) {
        return timeout ? await wait_1.Wait.shouldMatch(this, condition, timeout) : await wait_1.Wait.shouldMatch(this, condition);
    }
    async shouldNot(condition, timeout) {
        return await this.should(condition_1.Condition.not(condition), timeout);
    }
    async is(condition, timeout) {
        return timeout ? await wait_1.Wait.isMatch(this, condition, timeout) : await wait_1.Wait.isMatch(this, condition);
    }
    async isNot(condition, timeout) {
        return await this.is(condition_1.Condition.not(condition), timeout);
    }
    async matching(condition, timeout) {
        return timeout ? await wait_1.Wait.isMatch(this, condition, timeout) : await wait_1.Wait.isMatch(this, condition);
    }
    async matchingNot(condition, timeout) {
        return await this.is(condition_1.Condition.not(condition), timeout);
    }
    get(index) {
        return new element_1.Element(new byIndexedWebElementLocator_1.ByIndexedWebElementLocator(index, this));
    }
    first() {
        return this.get(0);
    }
    filter(condition) {
        return new Collection(new byFilteredWebElementsLocator_1.ByFilteredWebElementsLocator(condition, this));
    }
    filterBy(condition) {
        return this.filter(condition);
    }
    findBy(condition) {
        return new Collection(new byFilteredWebElementsLocator_1.ByFilteredWebElementsLocator(condition, this)).get(0);
    }
    async indexOfElementBy(condition) {
        await this.findBy(condition).should(__1.be.visible);
        const webElements = await this.getWebElements();
        for (let i = 0; i < webElements.length; i++) {
            try {
                await condition.matches(this.get(i));
                return i;
            }
            catch (ignored) {
            }
        }
    }
    async size() {
        return (await this.getWebElements()).length;
    }
    async getWebElements() {
        return await this.locator.find();
    }
    toString() {
        return this.locator.toString();
    }
}
__decorate([
    assertionHook_1.AssertionHooks
], Collection.prototype, "should", null);
__decorate([
    assertionHook_1.AssertionHooks
], Collection.prototype, "shouldNot", null);
exports.Collection = Collection;
function all(cssOrXpathOrBy) {
    return new Collection(new byWebElementsLocator_1.ByWebElementsLocator(utils_1.toBy(cssOrXpathOrBy)));
}
exports.all = all;
//# sourceMappingURL=collection.js.map