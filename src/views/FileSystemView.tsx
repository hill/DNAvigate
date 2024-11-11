import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { useState } from 'react';

export default function FileSystemView() {

  const [fileContents, setFileContents] = useState<string | null>(null);

  const handleFileOpen = async () => {
    const path = await open({
      multiple: false,
      directory: false,
      title: 'Open File',
      filters: [{
        name: 'Text Files',
        extensions: ['txt']
      }, {
        name: "FASTA Files",
        extensions: ["fasta", "fa", "fasta.gz", "fa.gz"]
      }, {
        name: "FASTQ Files",
        extensions: ["fastq", "fq", "fastq.gz", "fq.gz"]
      }]
    });

    if (!path) {
      console.log('No file selected');
      return;
    }

    console.log('Selected file:', path);
    // TODO: consider how to handle very large files
    const contents = await readTextFile(path);
    setFileContents(contents);
  }

  return (
    <div>
      <h1>File System</h1>
      <p>File System view</p>
      <button onClick={handleFileOpen}>Open File</button>
      {fileContents && <pre>{fileContents}</pre>}
    </div>
  )
}