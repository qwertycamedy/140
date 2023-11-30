import { setWindowWidth, windowSel } from "store/slices/window/windowSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function useWindowWidth() {
  const dispatch = useDispatch();
  const {windowWidth} = useSelector(windowSel);

  useEffect(() => {
    function handleResize() {
      dispatch(setWindowWidth(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return windowWidth;
}

export default useWindowWidth;
