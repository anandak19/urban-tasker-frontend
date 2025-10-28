// to stop unsaved changes
export interface ICanComponentDeactivate {
  canDeactivate(): boolean | Promise<boolean>;
}
