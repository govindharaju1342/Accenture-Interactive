export const get = (source: any, path: string, defaultValue: any) => {
    if (!!source && !!path) {
      const parts = path.split('.');
      const length = parts.length;
      let result = source;
      for (let i = 0; i < length; i++) {
        const item = result[parts[i]];
        if (item === null || item === undefined) {
          return item || defaultValue;
        }
        result = item;
      }
      return result;
    }
    return defaultValue;
  };
  