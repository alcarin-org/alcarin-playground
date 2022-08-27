export type ChangeEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};
