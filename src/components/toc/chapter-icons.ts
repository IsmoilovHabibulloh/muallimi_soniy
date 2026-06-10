import {
  BookOpen,
  Type,
  AudioLines,
  Repeat2,
  Quote,
  PenLine,
  Link2,
  WholeWord,
  ScrollText,
  HandHeart,
  BookMarked,
  type LucideIcon,
} from "lucide-react";

/* Bob ikonkalari — faqat lucide-react (CLAUDE.md qoidasi). mock-data'dagi
   emoji `icon` maydoni UI'da ISHLATILMAYDI (iOS export uchun saqlangan). */
export const CHAPTER_ICONS: Record<string, LucideIcon> = {
  ch_muqaddima: BookOpen,
  ch_harflar: Type,
  ch_madlar: AudioLines,
  ch_tashdid: Repeat2,
  ch_tanvin: Quote,
  ch_alif: PenLine,
  ch_vasl: Link2,
  ch_kalimalar: WholeWord,
  ch_suralar: ScrollText,
  ch_duolar: HandHeart,
};

export const DEFAULT_CHAPTER_ICON: LucideIcon = BookMarked;

export function chapterIcon(chapterId: string): LucideIcon {
  return CHAPTER_ICONS[chapterId] ?? DEFAULT_CHAPTER_ICON;
}
