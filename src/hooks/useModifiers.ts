import {useMemo} from 'react';
import * as Modifiers from '../commons/modifiers';

export default function useModifiers(props: any, options: Modifiers.ModifiersOptions) {
  const modifiers = useMemo(() => {
    return Modifiers.generateModifiersStyle(options, props);
  }, [props]);
  return modifiers;
};
