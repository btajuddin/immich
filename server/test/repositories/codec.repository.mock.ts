import {ICodecRepository} from "@app/domain";

export const newCodecRepositoryMock = (): jest.Mocked<ICodecRepository> => {
  return {
    findCodecs: jest.fn()
  };
};
