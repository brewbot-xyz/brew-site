import { GenIcon } from "react-icons/lib";

export default function DiscordCommunity(props: React.SVGProps<SVGSVGElement>) {
  return GenIcon({
    tag: "svg",
    attr: {
      fill: "url(#bgradient)",
      fillRule: "evenodd",
      viewBox: "0 0 16 15.2",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z",
        },
        child: [],
      },
      {
        tag: "svg",
        attr: {
          xmlns: "http://www.w3.org/2000/svg",
          width: "11",
          height: "11",
          viewBox: "0 0 24 24",
          x: "15%",
          y: "15%",
        },
        child: [
          {
            tag: "path",
            attr: {
              fill: "#fff",
              d: "m2.4 8.4 8.38-6.46a2 2 0 0 1 2.44 0l8.39 6.45a2 2 0 0 1-.79 3.54l-.32.07-.82 8.2a2 2 0 0 1-1.99 1.8H16a1 1 0 0 1-1-1v-5a3 3 0 1 0-6 0v5a1 1 0 0 1-1 1H6.31a2 2 0 0 1-1.99-1.8L3.5 12l-.32-.07a2 2 0 0 1-.79-3.54Z",
            },
            child: [],
          },
        ],
      },
      {
        tag: "defs",
        attr: {},
        child: [
          {
            tag: "linearGradient",
            attr: {
              id: "bgradient",
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
            },
            child: [
              {
                tag: "stop",
                attr: { offset: "0%", stopColor: "#a050ff" },
                child: [],
              },
              {
                tag: "stop",
                attr: { offset: "100%", stopColor: "#eb9aba" },
                child: [],
              },
            ],
          },
        ],
      },
    ],
  })(props);
}
