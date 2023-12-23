import { FileReadOptions } from 'fs/promises';
import { Readable } from 'stream';
import { CrawlOptionsDto } from '../library';

export interface ImmichReadStream {
  stream: Readable;
  type?: string;
  length?: number;
}

export interface ImmichZipStream extends ImmichReadStream {
  addFile: (inputPath: string, filename: string) => void;
  finalize: () => Promise<void>;
}

export interface DiskUsage {
  available: number;
  free: number;
  total: number;
}

export interface FileStats {
  size: number;
  mtime: Date;
  canRead: boolean;
  canWrite: boolean;
}

export const IStorageRepository = 'IStorageRepository';

export interface IStorageRepository {
  /**
   * Read a file from the given path.
   *
   * @param filepath the path to read
   */
  readFile(filepath: string): Promise<Readable>;

  /**
   * Writes a file to the given path.
   *
   * @param filepath the path to write to
   * @param buffer the file data
   */
  writeFile(filepath: string, buffer: Buffer): Promise<void>;

  /**
   * Remove a path from the system. If the path is a folder, recursive must be specified.
   *
   * @param filepath the path to remove
   * @param options options to modify the removal
   */
  remove(filepath: string, options?: { recursive?: boolean; force?: boolean }): Promise<void>;

  /**
   * Remove any directories that are empty. If specified, also remove the provided directory.
   *
   * @param folder the folder to search for empty directories
   * @param self whether or not to delete self if it is empty after processing its children
   */
  removeEmptyDirs(folder: string, self?: boolean): Promise<void>;

  /**
   * Move the file at source to the target location.
   *
   * @param source the source file
   * @param target the new path for the file
   */
  moveFile(source: string, target: string): Promise<void>;

  /**
   * Create a directory, if applicable to the backend.
   *
   * @param filepath the directory path to make
   */
  mkdir(filepath: string): void;

  /**
   * Determine the disk usage of the given folder.
   *
   * @param folder the folder to check
   */
  checkDiskUsage(folder: string): Promise<DiskUsage>;

  /**
   * Retrieve some basic {@link FileStats} for a given path.
   *
   * @param filepath the path to get the stats for
   */
  stat(filepath: string): Promise<FileStats | undefined>;

  /**
   * Crawl the given base paths (or all paths) given the provided specifications for excluded patterns and hidden
   * files. Pattern matching should be case-insensitive. Additionally, only files of the supported mime types from
   * {@link mimeTypes.getSupportedFileExtensions} should be returned. The result should not include paths to directories
   * and all paths should be absolute.
   *
   * @param crawlOptions the parameters to control the crawl behavior.
   */
  crawl(crawlOptions: CrawlOptionsDto): Promise<string[]>;
}
