export default abstract class DBWrapper<K, V> {
  public abstract get(identifier: K | undefined): Promise<V | null | undefined>;

  public async save(savedType: V) {
    await deps.dataSource.manager.save(savedType);
  }

  async getSafely(identifier: K | undefined) {
    let document: V | undefined | null = null;
    try {
      document = await this.get(identifier);
    } finally {
      return document;
    }
  }
}
