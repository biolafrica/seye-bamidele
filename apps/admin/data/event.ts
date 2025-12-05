import { formatDate } from "@/app/utils/common/formatDate";
import { TableColumn } from "@/components/common/DataTable";
import { FormField } from "@/components/common/Form";
import { Event } from "@/types/events";

export const eventFields:FormField[] = [
  { name: 'event', label: 'Event Name', type: 'text', placeholder: 'Enter event name', required: true },
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter description', required: true },
  { name: 'link', label: 'Link', type: 'url', placeholder: 'https://example.com', required: true },
  { name: 'category', label: 'Category', type: 'select', required: true,
    options: [
      { label: 'Select category', value: '' },
      { label: 'Conference', value: 'conference' },
      { label: 'Show', value: 'show' },
      { label: 'Podcast', value: 'podcast' },
    ],
  },
  { name: 'type', label: 'Type', type: 'select', required: true,
    options: [
      { label: 'Select type', value: '' },
      { label: 'Audio', value: 'audio' },
      { label: 'Video', value: 'video' },
      { label: 'Article', value: 'article' },
    ],
  },
];

export const columns: TableColumn<Event>[] = [
  { key: 'created_at', header: 'Date', sortable: true, accessor:(row)=>formatDate(row.created_at ) },
  { key: 'event', header: 'Event Name', sortable: true},
  { key: 'title', header: 'Title', sortable: true},
  { key: 'category', header: 'Category', sortable: true},
];