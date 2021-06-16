import { useCallback } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const tagsState = atom<string[]>({
  key: "tagsState",
  default: [],
});

export function useTagValue() {
  return useRecoilValue(tagsState);
}

export function useTagAction() {
  const [tags, setTags] = useRecoilState(tagsState);

  const changeTag = useCallback(
    (tags: string[]) => {
      setTags(tags);
    },
    [tags]
  );

  const removeTag = useCallback(
    (tag: string) => {
      const nextTags = tags.filter((t) => t !== tag);
      setTags(nextTags);
    },
    [tags]
  );

  const insertTag = useCallback(
    (tag: string) => {
      if (tag === "" || tags.includes(tag)) return;

      let processed = tag;
      processed = tag.trim();

      if (processed.indexOf(" #") > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }
        setTags((oldTags) => [...oldTags, ...tempTags]);
        return;
      }
      if (processed.charAt(0) === "#") {
        processed = processed.slice(1, processed.length);
      }

      setTags((oldTags) => [...oldTags, processed]);
    },
    [tags]
  );

  return { changeTag, insertTag, removeTag };
}
