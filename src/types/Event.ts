export type Events = {
  id: number;
  title: string;
  date: string;
  description: string;
  // image : string;
  isPublished: boolean;
}

export const event = [
       {
    id: 1,
    title: "Seminar React",
    date: "2026-05-10",
    description: "Jakarta",
    isPublished: true,
    
  },
  {
    id: 2,
    title: "Workshop TypeScript",
    date: "2026-05-15",
    description: "Bandung",
    isPublished: false,
  },
];