
import { invoke } from "@tauri-apps/api/core";

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
export async function greet(name: string) {
  return await invoke("greet", { name });
}