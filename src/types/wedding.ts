export interface FilmFrame {
  src: string;
  alt: string;
}

export interface Godparent {
  name: string;
  role: string;
  image: string;
}

export interface ProgrammeItem {
  time: string;
  title: string;
  description: string;
}

export interface GiftIdea {
  title: string;
  caption: string;
  image: string;
}

export type Attendance = "yes" | "no";
export type MenuChoice = "meat" | "fish" | "vegetarian";
export type RsvpStatus = "idle" | "submitting" | "success";

export interface RsvpValues {
  name: string;
  attendance: Attendance;
  guests: number;
  menu: MenuChoice;
  note: string;
}