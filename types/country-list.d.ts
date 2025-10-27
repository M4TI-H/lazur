declare module "country-list" {
  export function getNames(): string[];
  export function getCode(countryName: string): string | undefined;
  export function getName(countryCode: string): string | undefined;
  export function getData(): { name: string; code: string }[];
}
