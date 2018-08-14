import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class ScrollIntoView implements Command<Element> {
    perform(entity: Element, ...args: any[]): Promise<void>;
}