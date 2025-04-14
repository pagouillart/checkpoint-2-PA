import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../data-source";

@Resolver(Country)
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);

  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }
  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return this.countryRepository.findOne({ where: { code } });
  }

  @Query(() => [Country])
async getCountriesByContinent(@Arg("continent", { nullable: true }) continent?: string): Promise<Country[]> {
  if (continent) {
    return this.countryRepository.find({ where: { continent } });
  }
  return this.countryRepository.find();
}

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = this.countryRepository.create({ code, name, emoji, continent });
    return this.countryRepository.save(country);
  }

  @Mutation(() => Boolean)
  async deleteCountry(@Arg("code") code: string): Promise<boolean> {
    const result = await this.countryRepository.delete({ code });
    return result.affected !== 0;
  }
}
