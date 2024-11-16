import { LSystemRenderer, PEANO_GOSPER } from "@/components/lsystem";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="background">
          <LSystemRenderer
            iterations={6}
            lsystem={PEANO_GOSPER}
            length={7}
            margin={5}
            stroke={{ color: "black", width: 1 }}
          />
        </div>
        <div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
