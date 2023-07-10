import { useContext } from 'react';
import utilityContext from '../context/utility'

function useUtilityContext() {
  return useContext(utilityContext);
}

export default useUtilityContext;
