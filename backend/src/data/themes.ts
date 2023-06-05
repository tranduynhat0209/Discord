import { Entity } from '../types';
import DBWrapper from './db-wrapper';
import parseCSS from 'css-parse';

type ThemeDocument = any
export default class Themes extends DBWrapper<string, ThemeDocument> {
  public async get(id: string | undefined) {
    
  }
  public async getByCode(code: string | undefined) {
    
  }

  public async create(options: Partial<Entity.Theme>) {
    
  }

  public async lock(themeId: string, user: any) {
   
  }
  public async unlock(themeId: string, user: any) {
    
  }

  public parse(styles: string) {
    try { parseCSS(styles) }
    catch (error: any) {
      throw new TypeError(`CSS Error: ${error.message}`);
    }
  }
}