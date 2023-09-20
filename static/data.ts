export interface Events {
  date: string;
  name: string;
  location: string;
  time: string;
}

const EventData: Events[] = [
  {
    date: "2023-09-21",
    name: "Movie Night",
    location: "Genesis Cinema, Festac",
    time: "8:30AM-10:30AM",
  },
  {
    date: "2023-09-21",
    name: "Burnfire",
    location: "Amusement Park",
    time: "2:00 PM",
  },
  {
    date: "2023-09-25",
    name: "Event 3",
    location: "Location 3",
    time: "3:30 PM",
  },
];

export { EventData };
