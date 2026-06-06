import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export interface Bookmark {
  id: string;
  lawId: number;
  lawTitle: string;
  lawSubtitle: string;
  category: string;
  sectionNo: string;
  sectionTitle: string;
  summary: string;
  keywords: string[];
  savedAt: number;
}

const STORAGE_KEY = "nyayakosh_bookmarks_v1";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setBookmarks(JSON.parse(raw));
        } catch {
          setBookmarks([]);
        }
      }
      setLoaded(true);
    });
  }, []);

  const save = useCallback(async (updated: Bookmark[]) => {
    setBookmarks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addBookmark = useCallback(
    async (item: Omit<Bookmark, "id" | "savedAt">) => {
      const id = `${item.lawId}-${item.sectionNo}`;
      const already = bookmarks.some((b) => b.id === id);
      if (already) return;
      const newItem: Bookmark = { ...item, id, savedAt: Date.now() };
      await save([newItem, ...bookmarks]);
    },
    [bookmarks, save]
  );

  const removeBookmark = useCallback(
    async (id: string) => {
      await save(bookmarks.filter((b) => b.id !== id));
    },
    [bookmarks, save]
  );

  const isBookmarked = useCallback(
    (lawId: number, sectionNo: string) =>
      bookmarks.some((b) => b.id === `${lawId}-${sectionNo}`),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    async (item: Omit<Bookmark, "id" | "savedAt">) => {
      const id = `${item.lawId}-${item.sectionNo}`;
      if (bookmarks.some((b) => b.id === id)) {
        await removeBookmark(id);
      } else {
        await addBookmark(item);
      }
    },
    [bookmarks, addBookmark, removeBookmark]
  );

  return { bookmarks, loaded, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
