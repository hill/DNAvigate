import { open } from "@tauri-apps/plugin-dialog";
import { type DirEntry, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { FilePicker } from "../components/FilePicker";

export default function FileSystemView() {
  const [currentPath, setCurrentPath] = useState<string>(
    "/Users/tomhill/Developer/projects/DNAvigate/examples",
  );
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [entries, setEntries] = useState<DirEntry[]>([]);

  const handlePick = (entry: DirEntry) => {
    if (entry.name === "..") {
      setCurrentPath(currentPath.replace(/\/[^/]+$/, ""));
      return;
    }

    if (entry.isDirectory) {
      setCurrentPath(`${currentPath}/${entry.name}`);
    } else {
      handleSelectFile(`${currentPath}/${entry.name}`);
    }
  };

  const handleFileOpen = async () => {
    const path = await open({
      multiple: false,
      directory: false,
      title: "Open File",
      filters: [
        {
          name: "Text Files",
          extensions: ["txt"],
        },
        {
          name: "FASTA Files",
          extensions: ["fasta", "fa", "fasta.gz", "fa.gz"],
        },
        {
          name: "FASTQ Files",
          extensions: ["fastq", "fq", "fastq.gz", "fq.gz"],
        },
      ],
    });

    handleSelectFile(path);
  };

  const handleSelectFile = async (path: string | null) => {
    if (!path) {
      return;
    }
    // TODO: consider how to handle very large files
    const contents = await readTextFile(path);
    setFileContents(contents);
  };

  async function getFiles(path: string) {
    const contents = await readDir(path);
    setEntries(contents);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: not getFiles
  useEffect(() => {
    getFiles(currentPath);
  }, [currentPath]);

  const sortedEntries = [
    { name: "..", isDirectory: true, isSymlink: false, isFile: false },
    ...entries
      .sort((a, b) => {
        // Sort directories before files
        if (a.isDirectory !== b.isDirectory) {
          return a.isDirectory ? -1 : 1;
        }
        // If both are directories or both are files, sort by name
        return a.name.localeCompare(b.name);
      })
      .filter((entry) => !entry.name.startsWith(".")), // Hide hidden files
  ];

  return (
    <div className="flex justify-between border-t border-neutral-200">
      <div className="w-60 border-r border-neutral-200 h-screen p-2">
        <p className="text-sm">Files</p>
        <FilePicker entries={sortedEntries} onSelectFile={handlePick} />
        <Button size="small" onClick={handleFileOpen}>
          Open File
        </Button>
      </div>
      <div className="overflow-y-scroll h-screen w-full text-select">
        {fileContents && <pre className="text-xs">{fileContents}</pre>}
      </div>
    </div>
  );
}
