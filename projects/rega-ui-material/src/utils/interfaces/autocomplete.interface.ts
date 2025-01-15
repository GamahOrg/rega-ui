export interface AutoCompleteSelectEvent extends OriginalEvent {
  value: any;
}

export interface AutoCompleteCompleteEvent extends OriginalEvent {
  query: string;
}

export interface OriginalEvent {
  originalEvent: Event;
}

export interface Option extends IdLabel {}

export interface IdLabel {
  id: any;
  label: any;
}

export interface LazyLoadingEvent {
  first: number;
  last: number;
}
