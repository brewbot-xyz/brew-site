"use client";

import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";

export default function Scrollbars() {
  const [initOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: "os-theme-light",
        autoHide: "scroll",
      },
    },
  });

  useEffect(() => {
    const ua = new UAParser();
    const { type } = ua.getDevice();
    const cancelDevices = ["console", "mobile", "tablet", "smarttv"];

    initOverlayScrollbars({
      target: document.body,
      cancel: {
        nativeScrollbarsOverlaid: !!type && cancelDevices.includes(type),
      },
    });
  }, [initOverlayScrollbars]);

  return null;
}
