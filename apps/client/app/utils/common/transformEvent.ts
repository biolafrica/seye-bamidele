import { EventClientData, EventTransformedData } from "@seye-bamidele/shared-types";

export function transformEvents(eventsFromDb: EventClientData[]): EventTransformedData[] {
  return eventsFromDb.map((event) => {
    
    let action = '';

    switch (event.type) {
      case 'video':
        action = 'Watch';
        break;
      case 'audio':
        action = 'Listen to';
        break;
      case 'article':
        action = 'Read';
        break;
      default:
        action = 'View';
    }

    return {
      category: capitalize(event.category),
      event: event.event,
      title: event.title,
      description: event.description,
      link: {
        text: `${action} ${event.category}`,
        url: event.link,
      },
    };
  });
}

// Optional helper
function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
