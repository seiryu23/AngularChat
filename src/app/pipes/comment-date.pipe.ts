import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// カスタムパイプ
@Pipe
(
  {
    name: 'commentDate'
  }
)

export class CommentDatePipe implements PipeTransform
{
  transform(value: number, ...args: string[]): string
  {
    const format = args[0] || 'yyyy年mm月dd日 hh:mm';
    // アメリカの時間しかサポートしていない
    return formatDate(value, format, 'en-US');
  }
}
