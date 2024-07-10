import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(array: any[], chunkSize: number): any[][] {
    if (!Array.isArray(array)) {
      return [];
    }

    return Array(Math.ceil(array.length / chunkSize))
      .fill(null)
      .map((_, index) => index * chunkSize)
      .map(begin => array.slice(begin, begin + chunkSize));
  }
}