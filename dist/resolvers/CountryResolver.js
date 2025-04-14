"use strict";
// src/resolvers/CountryResolver.ts
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
exports.CountryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Country_1 = require("../entities/Country");
const data_source_1 = require("../data-source");
let CountryResolver = class CountryResolver {
    constructor() {
        this.countryRepository = data_source_1.AppDataSource.getRepository(Country_1.Country);
    }
    async getCountries() {
        return this.countryRepository.find();
    }
    async getCountryByCode(code) {
        return this.countryRepository.findOne({ where: { code } });
    }
    async getCountriesByContinent(continent) {
        if (continent) {
            return this.countryRepository.find({ where: { continent } });
        }
        return this.countryRepository.find();
    }
    async createCountry(code, name, emoji, continent) {
        const country = this.countryRepository.create({ code, name, emoji, continent });
        return this.countryRepository.save(country);
    }
    async deleteCountry(code) {
        const result = await this.countryRepository.delete({ code });
        return result.affected !== 0;
    }
};
exports.CountryResolver = CountryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Country_1.Country]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "getCountries", null);
__decorate([
    (0, type_graphql_1.Query)(() => Country_1.Country, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "getCountryByCode", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Country_1.Country]),
    __param(0, (0, type_graphql_1.Arg)("continent", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "getCountriesByContinent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Country_1.Country),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __param(2, (0, type_graphql_1.Arg)("emoji")),
    __param(3, (0, type_graphql_1.Arg)("continent")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "createCountry", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "deleteCountry", null);
exports.CountryResolver = CountryResolver = __decorate([
    (0, type_graphql_1.Resolver)(Country_1.Country)
], CountryResolver);
