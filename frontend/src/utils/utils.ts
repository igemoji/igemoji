import type { ColorRGB } from "@/types/types";

export const getStartAt = (duration: number, initialRemainingTime?: number) => {
  if (duration === 0 || duration === initialRemainingTime) {
    return 0;
  }

  return typeof initialRemainingTime === "number" ? duration - initialRemainingTime : 0;
};

export const getWrapperStyle = (size: number | string): React.CSSProperties => ({
  position: "relative",
  width: size,
  height: 10,
});

export const getIsColorBetweenColors = (color: ColorRGB, start: ColorRGB, end: ColorRGB) => {
  const getIsInRange = (x: number, min: number, max: number) => (x - min) * (x - max) <= 0;

  const getRGB = (color: ColorRGB): number[] =>
    color
      .match(/(\d+),(\d+),(\d+)/)!
      .splice(1, 4)
      .map((c: string) => parseInt(c, 10));

  const colorRGB = getRGB(color);
  const startRGB = getRGB(start);
  const endRGB = getRGB(end);

  return colorRGB.every((c, index) => getIsInRange(c, startRGB[index], endRGB[index]));
};

export const timeStyle: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: "200%",
};
