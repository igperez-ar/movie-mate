import { useSelector } from 'react-redux';

export const useConfigSelectors = () => {
  const flags = useSelector((state: RootState) => state.config.flags);

  return {
    flags,
  };
};
