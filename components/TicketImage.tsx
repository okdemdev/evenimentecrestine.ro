interface TicketImageProps {
  imageUrl?: string;
}

export function TicketImage({ imageUrl }: TicketImageProps) {
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg mx-auto px-4">
      <img
        src={imageUrl || '/concert-default.jpg'}
        alt="Event"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
