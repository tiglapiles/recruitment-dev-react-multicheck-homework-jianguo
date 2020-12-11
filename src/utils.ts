type fn = (arg: any) => any;

// functional programming for map iterator
export function fpMap(func: fn): fn {
  return function (arr: []): [] {
    let length: number = arr.length || 0;
    let i: number = 0;
    let result: [] = [];

    while (i < length) {
      result.push(func(arr[i]));
      i++;
    }
    return result;
  };
}

// functional programming pipe
export function pipe(...fns: fn[]): fn {
  return function (x: any) {
    fns.reduce((v: any, f: any) => f(v), x);
  };
}
