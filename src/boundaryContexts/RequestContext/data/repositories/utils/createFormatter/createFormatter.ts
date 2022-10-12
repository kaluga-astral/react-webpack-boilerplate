type Formatter<RepositoryType, SourceType> = {
  toRepository: (value: SourceType) => RepositoryType;
  toSources: (value: RepositoryType) => SourceType;
};

export const createFormatter = <RepositoryType, SourceType>(
  formatter: Formatter<RepositoryType, SourceType>,
): Formatter<RepositoryType, SourceType> => formatter;
