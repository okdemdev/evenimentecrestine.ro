interface TicketDetailsProps {
  eventTitle: string;
  organizer: string;
  location: string;
  participant: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  date: string;
  time: string;
}

export function TicketDetails({
  eventTitle,
  organizer,
  location,
  participant,
  date,
  time,
}: TicketDetailsProps) {
  return (
    <div className="px-6 py-4 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{eventTitle}</h2>
        <p className="text-gray-500 text-sm">{organizer}</p>
      </div>

      <div className="space-y-4 divide-y divide-dashed">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <p className="text-gray-500 text-sm">Locație</p>
            <p className="font-medium">{location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-4">
          <div>
            <p className="text-gray-500 text-sm">Participant</p>
            <p className="font-medium">{participant.name}</p>
            <p className="text-sm text-gray-500">{participant.email}</p>
            <p className="text-sm text-gray-500">{participant.phoneNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <div>
            <p className="text-gray-500 text-sm">Data</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Loc</p>
            <p className="font-medium">Orice loc</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <div>
            <p className="text-gray-500 text-sm">Ora</p>
            <p className="font-medium">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
