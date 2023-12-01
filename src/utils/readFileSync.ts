import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Reads a file synchronously and returns its content as a string.
 * @param relativeFilePath The relative path to the file from the importing module.
 * @param callerUrl The URL of the calling module (import.meta.url).
 * @returns The file content as a string.
 */
export function readFileSync(
  relativeFilePath: string,
  callerUrl: string,
): string {
  // Determine the directory of the calling module
  const callerDir = path.dirname(fileURLToPath(callerUrl));

  // // Resolve the full path of the target file
  const filePath = path.join(callerDir, relativeFilePath);

  // // Read and return the file content
  return fs.readFileSync(filePath, 'utf-8');
}
