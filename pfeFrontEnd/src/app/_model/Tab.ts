export interface Tab {
    label: string;
    content: string;
    clickAction?: () => void; // Making clickAction property optional
  }
  