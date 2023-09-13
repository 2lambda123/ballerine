import {
  DynamicUIRendererContext,
  dynamicUIRendererContext,
} from '@app/components/organisms/DynamicUIRenderer/context';
import { useContext } from 'react';

export const useDynamicUIContext = <TContext>() =>
  useContext(dynamicUIRendererContext) as DynamicUIRendererContext<TContext>;
