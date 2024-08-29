/**
 * @packageDocumentation
 * @module utils
 */

import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'lodash-es';

type IfEqual<X, Y, A = X, B = never> = (<T>() => T extends X
  ? true
  : false) extends <T>() => T extends Y ? true : false
  ? A
  : B;

export type OmitFirst<T extends unknown[]> = T extends [unknown, ...infer R]
  ? R
  : [];

@Pipe({
  name: 'pure',
  standalone: true,
})
export class PurePipe implements PipeTransform {
  /**
   * ! Notice: function overload is not supported for `mapper`,
   * you may have to use `$any` to workaround in template.
   */
  transform<T extends (...args: unknown[]) => unknown>(
    value: Parameters<T>[0],
    mapper: T,
    ...args: IfEqual<T, any, unknown[], OmitFirst<Parameters<T>>>
  ) {
    return mapper.call(last(args), value, ...args) as ReturnType<T>;
  }
}
