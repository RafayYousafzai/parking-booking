// app/embed/widget/page.tsx
import React from "react";

export const metadata = {
  title: "Embeddable Widget",
};

export default function WidgetEmbedPage() {
  return (
    <html>
      <body style={{ margin: 0 }}>
        <div style={{ width: "100%", height: "100%" }}>
          <Map />
        </div>
      </body>
    </html>
  );
}

import Map from "@/components/map/Map";
