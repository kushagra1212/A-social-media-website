import React from 'react';
import {
  IdDeviceBreakpointsByWidth,
  IdMobileHeight,
  getWindowDimension,
} from '../../utils/responsive/index';
const { width, height } = getWindowDimension();
const initialState = { width, height };

type DisplayIn = 'Mobile' | 'MobilePortrait' | 'MobileLandScape' | 'Tablet' | 'Laptop';
interface ResponsiveProps {
  displayIn: DisplayIn[];
  children: React.ReactNode;
}

const Responsive: React.FC<ResponsiveProps> = ({ displayIn, children }) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    const handleResize = () => {
      const { width, height } = getWindowDimension();
      setState({ width, height });
    };
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  const shouldRender = (display: DisplayIn[], width: number, height: number) => {
    if (display.indexOf('Laptop') !== -1 && width >= IdDeviceBreakpointsByWidth.laptop_min) {
      return true;
    }
    if (
      display.indexOf('Tablet') !== -1 &&
      width <= IdDeviceBreakpointsByWidth.tablet_max &&
      width >= IdDeviceBreakpointsByWidth.tablet_min
    ) {
      return true;
    }
    // For mobile regardless of orientation
    if (display.indexOf('Mobile') !== -1 && width <= IdDeviceBreakpointsByWidth.mobile_max) {
      return true;
    }
    if (
      display.indexOf('MobilePortrait') !== -1 &&
      width <= IdDeviceBreakpointsByWidth.mobile_max &&
      height >= IdMobileHeight.mobileLandscape_max
    ) {
      return true;
    }
    return !!(
      display.indexOf('MobileLandScape') !== -1 &&
      width <= IdDeviceBreakpointsByWidth.mobile_max &&
      height <= IdMobileHeight.mobileLandscape_min
    );
  };
  const shouldRenderChildren = shouldRender(displayIn, state.width, state.height);
  return <React.Fragment>{shouldRenderChildren ? children : null}</React.Fragment>;
};
export default Responsive;
