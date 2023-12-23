import { IStorageRepository, StorageCore } from '@app/domain';

export const newStorageRepositoryMock = (reset = true): jest.Mocked<IStorageRepository> => {
  if (reset) {
    StorageCore.reset();
  }

  return {
    remove: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
    removeEmptyDirs: jest.fn(),
    moveFile: jest.fn(),
    mkdir: jest.fn(),
    checkDiskUsage: jest.fn(),
    stat: jest.fn(),
    crawl: jest.fn()
  };
};
