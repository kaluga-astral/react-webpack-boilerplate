import { ContentState, Typography } from '@example/shared';

import { useRequestWithTariffQuery } from '../../data';

type RequestViewerProps = { requestID: string };

export const RequestViewer = ({ requestID }: RequestViewerProps) => {
  const { data, isLoading } = useRequestWithTariffQuery(requestID);

  return (
    <ContentState isLoading={isLoading}>
      <Typography color="primary">{data?.description}</Typography>
    </ContentState>
  );
};
