import { FunctionComponent, ReactNode } from 'react';

import { getIndicatorName } from './utils';
import { IndicatorWrapper } from './styles';

type Props = {
  isShowFooter: boolean;
  footer: ReactNode | FunctionComponent;
};

const Indicator = ({ isShowFooter, footer }: Props) => {
  return (
    <IndicatorWrapper>
      <>
        {getIndicatorName()}
        {isShowFooter && footer}
      </>
    </IndicatorWrapper>
  );
};

export default Indicator;
