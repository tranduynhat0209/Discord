import { AppDataSource } from "./utils/data-source";
import { User } from "./entity/User";
import { Theme } from "./entity/Theme";

export default class Themes {
  public async get(id: number) {
    const theme = await AppDataSource.manager.findOneBy(Theme, { id: id });
    if (!Theme) throw new Error("No theme found");
    return theme;
  }

  public async getByCode(code: string) {
    const theme = await AppDataSource.manager.findOneBy(Theme, { code: code });
    if (!Theme) throw new Error("No theme found");
    return theme;
  }

  public async lock() {}

  public async unlock() {}

  public parse(style: string) {}
}
