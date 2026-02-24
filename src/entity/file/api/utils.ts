import {HttpHeaders} from "@angular/common/http";


export function getFilenameFromHeaders(headers: HttpHeaders): string {
  const contentDisposition = headers.get('Content-Disposition');

  console.log(headers)

  if (!contentDisposition) {
    return 'download';
  }

  // Пытаемся получить filename* (с поддержкой UTF-8)
  const filenameStarMatch = contentDisposition.match(/filename\*=(?:UTF-8|utf-8)''(.+?)(?:;|$)/);
  if (filenameStarMatch) {
    return decodeURIComponent(filenameStarMatch[1]);
  }

  // Пытаемся получить обычный filename
  const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(?:;|$)/);
  if (filenameMatch) {
    return filenameMatch[1];
  }

  return 'download';
}
