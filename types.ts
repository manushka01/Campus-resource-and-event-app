
export enum Role {
  STUDENT = 'student',
  FACULTY = 'faculty',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: User;
  participants: string[]; // array of user IDs
  certificatesGenerated: boolean;
  imageUrl?: string;
}

export interface Booking {
    id: string;
    by: User;
    from: string;
    to: string;
    approvedBy?: User;
    status: 'pending' | 'booked' | 'declined';
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  bookings: Booking[];
}

export interface Feedback {
  id: string;
  event: Event;
  student: User;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
}
