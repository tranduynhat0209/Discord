export default abstract class DBWrapper<K, V> {
  public abstract get(identifier: K | undefined): Promise<V | null | undefined>;

  save(savedType: V) {}

  async getSafely(identifier: K | undefined) {
    let document: V | undefined | null = null;
    try {
      document = await this.get(identifier);
    } finally {
      return document;
    }
  }
}
