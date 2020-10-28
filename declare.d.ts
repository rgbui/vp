declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare interface Window {
  importVpIcon(type: string, name: string): string;
}

type ArrayOf<T> = T extends (infer p)[] ? p : never;