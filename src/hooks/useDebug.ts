import { useStoreState } from '../store/store';

function useIsDebug(): boolean {
  return useStoreState((store) => store.isDebug);
}

export { useIsDebug };
