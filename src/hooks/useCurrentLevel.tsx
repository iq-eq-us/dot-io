import { useStoreState } from '../store/store';

export default function useCurrentLevel(): [number, number] {
  const currentLevel = useStoreState((store) => store.currentLevel);
  const maxLevel = 200;

  return [currentLevel, maxLevel];
}
