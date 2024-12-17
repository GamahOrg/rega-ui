import { isDevMode } from "@angular/core";
import { IsEqual, ObjectsEqual } from "./helper-functions";
import { keyValue } from "../interfaces";
// import { decryptData, encryptData } from './crypto-js-helper';

export abstract class GStatic {
  // public static encryptData = (data: any): any => encryptData(data);

  // public static decryptData = (data: any): any => decryptData(data);

  public static isEqual = (value1: any, value2: any): boolean => IsEqual(value1, value2);

  public static objectsEqual = (...objs: any[]): boolean => ObjectsEqual(...objs);

  // public static toFormData = (data: any): FormData => toFormData(data);

  public static removeDuplicate = <T>(list: T[], param: string = "id"): T[] => {
    // Sort from length to make biggest objects first Then remove the smaller
    list = list.sort(
      (a: T, b: T) => Object.keys(b as any).length - Object.keys(a as any).length
    );

    const uniqueObjects: T[] = [];

    const uniqueIds = new Set();

    list.forEach((obj) => {
      if (!uniqueIds.has((obj as any)[param])) {
        uniqueIds.add((obj as any)[param]);
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  };

  public static log = (...args: any[]): void => {
    if (isDevMode()) {
      args[0] = "%c" + args[0] + " 🚀🚀";
      args.splice(
        1,
        0,
        "background: #bfdbfe; color: #000000; padding:2px 5px; border-radius: 4px"
      );
      console.log(...args);
    }
  };

  public static logImp = (...args: any[]): void => {
    if (isDevMode()) {
      args[0] = "%c" + args[0] + " 🚀🚀";
      args.splice(
        1,
        0,
        "background: #991010; color: #ddd; padding:2px 5px; border-radius: 4px"
      );
      console.log(...args);
    }
  };

  public static dynamicNameLength = (itemList: any[]): any[] => {
    return itemList.map((obj: any, index: number) => {
      const dynamicLength: number = itemList.length - index; // Adjust the logic based on your requirements
      obj.name = obj.name.slice(0, dynamicLength);
      return obj;
    });
  };

  public static truncateAndBreak = (str: string, maxLength: number): string => {
    const regex: RegExp = new RegExp(`.{1,${maxLength}}`, "g");

    const text: string =
      str.substring(0, maxLength) +
      "\n" +
      str.substring(maxLength).match(regex)?.join("\n");

    return text?.replace(/\bundefined\b/g, "");
  };

  public static isEmptyObject = (obj: {}): boolean => {
    for (let name in obj) return false;
    return true;
  };

  public static ipPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  public static enumToArray = (enumObj: object): keyValue[] => {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({ key, value: enumObj[key as keyof typeof enumObj] }));
  };
}
