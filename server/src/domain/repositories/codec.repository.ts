
export const ICodecRepository = 'ICodecRepository';

export interface ICodecRepository {
  /**
   * Read the valid codecs from the linux device directory.
   *
   * @return an array of valid hardware codec strings
   */
  findCodecs(): Promise<string[]>;
}
