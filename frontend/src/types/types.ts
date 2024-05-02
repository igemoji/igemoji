type ThemeIconName = "sun-o" | "moon-o";

type MusicIconName = "music-note" | "music-off";

type ButtonName = "check" | "start" | "exit" | "mainStart";

interface NavigationProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

interface MainModalProps {
  visible: boolean;
  close: () => void;
}

export type { ThemeIconName, MusicIconName, ButtonName, NavigationProps, MainModalProps };

type ColorHex = `#${string}`;
type ColorRGBA = `rgba(${string})`;
type ColorURL = `url(#${string})`;
export declare type ColorRGB = `rgb(${string})`;
export declare type ColorFormat = ColorHex | ColorRGB | ColorRGBA | ColorURL;

type TimeProps = {
  remainingTime: number;
  elapsedTime: number;
  color: ColorFormat;
};

type SingleColor = {
  colors: ColorFormat;
  colorsTime?: never;
};

type MultipleColors = {
  colors: { 0: ColorHex } & { 1: ColorHex } & ColorHex[];
  colorsTime: { 0: number } & { 1: number } & number[];
};

type OnComplete = {
  shouldRepeat?: boolean;
  delay?: number;
  newInitialRemainingTime?: number;
};

export declare type Props = {
  duration: number;
  initialRemainingTime?: number;
  updateInterval?: number;
  size?: number;
  trailColor?: ColorFormat;
  isPlaying?: boolean;
  isSmoothColorTransition?: boolean;
  isGrowing?: boolean;
  children?: (props: TimeProps) => React.ReactNode;
  onComplete?: (totalElapsedTime: number) => OnComplete | void;
  onUpdate?: (remainingTime: number) => void;
} & (SingleColor | MultipleColors);

export declare const useCountdown: (props: Props) => {
  elapsedTime: number;
  path: string;
  pathLength: number;
  remainingTime: number;
  rotation: "clockwise" | "counterclockwise";
  size: number;
  stroke: ColorFormat;
  strokeDashoffset: number;
  strokeWidth: number;
};

export declare const CountdownCircleTimer: {
  (props: Props): JSX.Element;
  displayName: "CountdownCircleTimer";
};
