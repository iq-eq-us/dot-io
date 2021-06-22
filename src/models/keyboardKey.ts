export type KeyboardKeyID = number;

export interface KeyboardKey {
  id: KeyboardKeyID;
  title: string;
  titleTransformOverride?: string;
}
