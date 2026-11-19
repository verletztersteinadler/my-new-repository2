import { useSyncExternalStore } from "react";

export type PickItem = {
  seriesId: string;
  sizeId?: string;
  slug: string;
  title: string;
  maker: string;
};

const KEY = "kotly-picks-v1";
const EVENT = "kotly-picks";

export function pickKey(item: { seriesId: string; sizeId?: string }) {
  return `${item.seriesId}|${item.sizeId ?? ""}`;
}

function read(): PickItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is PickItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as PickItem).seriesId === "string" &&
        typeof (item as PickItem).slug === "string" &&
        typeof (item as PickItem).title === "string",
    );
  } catch {
    return [];
  }
}

function write(list: PickItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function getPicks(): PickItem[] {
  if (typeof window === "undefined") return [];
  return read();
}

export function togglePick(item: PickItem) {
  if (typeof window === "undefined") return;
  const list = read();
  const index = list.findIndex((entry) => pickKey(entry) === pickKey(item));
  if (index >= 0) list.splice(index, 1);
  else list.push(item);
  write(list);
}

export function removePick(seriesId: string, sizeId?: string) {
  if (typeof window === "undefined") return;
  const key = pickKey({ seriesId, sizeId });
  write(read().filter((entry) => pickKey(entry) !== key));
}

export function clearPicks() {
  if (typeof window === "undefined") return;
  write([]);
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function usePicks(): PickItem[] {
  return useSyncExternalStore(subscribe, getPicks, () => []);
}
