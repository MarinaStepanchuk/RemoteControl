import { mouse, left, right, up, down } from '@nut-tree/nut-js';
import { commandsStr } from "./utility/constants";
import { drawCircle } from './utility/drawCircle';
import { drawSquare } from './utility/drawSquare';
import { drawRectangle } from './utility/drawRectangle';

const commands = {
  [commandsStr.MOUSE_LEFT]: async (width: string) => await mouse.move(left(+width)),
  [commandsStr.MOUSE_RIGHT]: async (width: string) => await mouse.move(right(+width)),
  [commandsStr.MOUSE_UP]: async (width: string) => await mouse.move(up(+width)),
  [commandsStr.MOUSE_DOWN]: async (width: string) => await mouse.move(down(+width)),
  [commandsStr.DRAW_CIRCLE]: async (width: string) => await drawCircle(width),
  [commandsStr.DRAW_RECTANGLE]: async (width: string, height: string) => await drawRectangle(+width, +height),
  [commandsStr.DRAW_SQUARE]: async (width: string) => await drawSquare(+width),
}

export const launchUserDrawCommand = async (command: string, width: string, height: string) => {
  // @ts-ignore
  commands[command]?.(width, height);
}
