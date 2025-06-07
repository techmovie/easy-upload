import { JSX } from 'preact';

export type ContainerLayoutType = {
  title: JSX.Element;
  functions: JSX.Element;
  search: JSX.Element;
  upload: JSX.Element;
  onSearchClick: () => void;
};
