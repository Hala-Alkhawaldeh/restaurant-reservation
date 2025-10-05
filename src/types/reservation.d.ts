export interface TimeSlot {
  start: string; // "11:00"
  end: string;   // "17:00"
}

export interface DaySlots {
  day: string; // "Saturday"
  slots: TimeSlot[];
}
