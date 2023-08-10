import * as React from "react";
import {utils} from '@soltan/utils'
export interface ButtonProps {}
export const Button = (props: React.PropsWithChildren<ButtonProps>) => {

  return <button className={utils.getName()}>{props.children}</button>;
};
