import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism } from "@mantine/prism";
import { Language } from "prism-react-renderer";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ children }: { children: string }) {
  /* eslint-disable @next/next/no-img-element */

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="heading text-white mt-[1rem] underline" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="heading text-lightgray mt-[1rem]" {...props}>
            {children}
          </h2>
        ),
        p: ({ children, ...props }) => (
          <p className="paragraph text-lightgray mt-[1rem]" {...props}>
            {children}
          </p>
        ),
        a: ({ children, ...props }) => (
          <a className="paragraph text-primary mt-[1rem] inline-block underline" {...props}>
            {children}
          </a>
        ),
        img: ({ alt, ...props }) => (
          <img alt={alt} {...props} className="max-w-full mx-auto mt-[1rem]" />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <Prism
              withLineNumbers
              language={match[1] as Language}
              colorScheme="dark"
              className="mt-[1rem]"
            >
              {String(children).replace(/\n$/, "")}
            </Prism>
          ) : (
            <code className="bg-darkgray p-[0.25rem] mt-[1rem]" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
