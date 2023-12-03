import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {AppDispatch, RootState} from '../reducers';

/* Pre-typed useDispatch and useSelector. They can be imported in any component and used normally
without defining the types everytime.  */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
