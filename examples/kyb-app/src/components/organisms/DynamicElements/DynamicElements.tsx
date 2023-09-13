import { ActionHandler } from '@app/components/organisms/DynamicElements/action-handlers/action-handler.abstract';
import { DynamicUIRendererContext } from '@app/components/organisms/DynamicElements/context';
import { useActionsHandler } from '@app/components/organisms/DynamicElements/hooks/useActionsHandler';
import { useContext } from '@app/components/organisms/DynamicElements/hooks/useContext';
import { AnyObject } from '@ballerine/ui';
import { useMemo } from 'react';
import { dynamicUIRendererContext } from './context';
import {
  Action,
  UIElement,
  UIElementComponent,
} from '@app/components/organisms/DynamicElements/types';
import { UIElementsList } from '@app/components/organisms/DynamicElements/components/UIElementsList';

const { Provider } = dynamicUIRendererContext;

interface Props<TContext> {
  context: TContext;
  actionHandlers: ActionHandler[];
  actions: Action[];
  uiElements: UIElement<AnyObject>[];
  elements?: Record<string, UIElementComponent>;
  errors?: AnyObject;
  onChange: (caller: UIElement<any>, value: unknown) => void;
}

export function DynamicElements<TContext>({
  context: _context,
  actionHandlers,
  actions,
  uiElements,
  elements,
  errors = {},
  onChange,
}: Props<TContext>) {
  const { context, updateContext, setContext, getContext } = useContext<TContext>(
    _context,
    onChange,
  );
  const { isProcessingActions, dispatchActions } = useActionsHandler(
    getContext,
    setContext,
    actionHandlers,
  );

  const dynamicUIctx: DynamicUIRendererContext<any> = useMemo(() => {
    return {
      dispatchActions,
      updateContext,
      getContext,
      isProcessingActions,
      actions,
      context,
      errors,
    };
  }, [dispatchActions, updateContext, getContext, isProcessingActions, actions, context, errors]);

  return (
    <Provider value={dynamicUIctx}>
      <UIElementsList elements={elements} definitions={uiElements} />
    </Provider>
  );
}
