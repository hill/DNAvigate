import type { DirEntry } from "@tauri-apps/plugin-fs";
import clsx from "clsx";
import { DirectoryIcon, FileIcon } from "../assets/icons";

export function FilePicker({
  entries,
  onSelectFile,
  className,
}: {
  entries: DirEntry[];
  onSelectFile: (entry: DirEntry) => void;
  className?: string;
}) {
  return (
    <ul className={clsx("w-full", className)}>
      {entries.map((entry) => (
        <FileRow key={entry.name} entry={entry} onClick={onSelectFile} />
      ))}
    </ul>
  );
}

function FileRow({
  entry,
  onClick,
}: { entry: DirEntry; onClick?: (entry: DirEntry) => void }) {
  return (
    <li
      className="flex items-center p-1 px-2 rounded-md text-xs hover:bg-neutral-200 cursor-pointer"
      onClick={() => onClick?.(entry)}
    >
      {!entry.isDirectory ? (
        <FileIcon className="mr-2 fill-[#59636E]" />
      ) : (
        <DirectoryIcon className="mr-2 fill-[#54AEFF]" />
      )}
      <span className="truncate cursor-pointer">{entry.name}</span>
    </li>
  );
}
