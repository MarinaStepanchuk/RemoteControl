import { mouse } from '@nut-tree/nut-js'
import { RawData, createWebSocketStream } from 'ws'
import {commandsStr} from "./utility/constants";
import { printScreen } from './utility/printScreen'

export type WSStream = ReturnType<typeof createWebSocketStream>

const commands = {
  [commandsStr.MOUSE_POSITION]: async (ws: WSStream) => {
    const mousePosition = await mouse.getPosition()
    ws.write(`mouse_position ${mousePosition.x},${mousePosition.y}`)
  },
  [commandsStr.PRNT_SCRN]: async (ws: WSStream) => await printScreen(ws),
}

export const launchUserInfoCommand = async (ws: WSStream, command: RawData) => commands[command.toString()]?.(ws);
