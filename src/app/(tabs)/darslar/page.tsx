"use client";

import { BookToc } from "@/components/toc/BookToc";
import { ResumeCard } from "@/components/darslar/ResumeCard";
import { useSettings } from "@/providers/SettingsProvider";
import { useBookToc } from "@/lib/hooks/useBookToc";

export default function DarslarPage() {
  const { t } = useSettings();
  const { outline } = useBookToc();

  return (
    <div className="max-w-lg mx-auto px-5 pt-6 pb-2">
      <h1 className="text-2xl font-bold text-text-main">{t("contents")}</h1>
      {outline && (
        <p className="text-[0.8125rem] text-text-muted mt-1 tabular-nums">
          {outline.totalPages} {t("pages")} · {outline.chapters.length}{" "}
          {t("chapters_unit")}
        </p>
      )}
      <ResumeCard />
      <div className="mt-5">
        <BookToc variant="page" />
      </div>
    </div>
  );
}
