declare module '*.css';

interface IDeviceWidthObject {
  [key: string]: { max: number; min: number };
}

interface IIdDeviceBreakpointsByWidth {
  laptop_max: number;
  laptop_min: number;
  tablet_min: number;
  tablet_max: number;
  mobile_max: number;
  default_min: number;
}

interface IIdMobileHeight {
  mobileLandscape_min: number;
  mobileLandscape_max: number;
}

interface IBuildDeviceDetails {
  deviceType: string;
  deviceTypeVariant: string;
  orientation: 'Portrait' | 'Landscape';
  width: number;
  height: number;
  isFallback: boolean;
}

interface IWindowDimension {
  width: number;
  height: number;
}

interface IHandleExceptionsProps {
  buildDeviceDetails: IBuildDeviceDetails;
  width: number;
  height: number;
}
