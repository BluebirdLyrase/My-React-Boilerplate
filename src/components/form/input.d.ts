import {
  FieldError,
  RegisterOptions,
  TFieldValues,
  TName,
} from "react-hook-form";

export type InputLabel = string;
export type InputName = string;
export type HideError = boolean;
export type HideRequire = boolean;

export type ValidationRules = Omit<
  RegisterOptions<TFieldValues, TName>,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

// export interface ValidationRules {
//   required?: string | boolean;
//   minLength?: {
//     value: number;
//     message: string;
//   };
//   maxLength?: {
//     value: number;
//     message: string;
//   };
//   min?: {
//     value: number;
//     message: string;
//   };
//   max?: {
//     value: number;
//     message: string;
//   };
//   pattern?: {
//     value: RegExp;
//     message: string;
//   };
//   validate: Function | Object;
//   //   valueAsNumber: boolean; //? comment out because I don't think I'll use this at all
//   //   valueAsDate: boolean;
//   //   setValueAs: <T>(value: any) => T;
// }
