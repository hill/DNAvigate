set dotenv-load := true

default:
  @just --list

dev:
  bun run tauri dev