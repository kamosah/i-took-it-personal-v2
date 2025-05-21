import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Providers } from "../../components/providers";


export * from "@testing-library/react";

export const render = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return rtlRender(<>{ui}</>, {
    wrapper: (props: React.PropsWithChildren) => (
      <Providers>{props.children}</Providers>
    ),
    ...options,
  });
};
