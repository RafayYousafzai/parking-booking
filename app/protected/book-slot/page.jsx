// app/protected/book-slot/page.tsx
import { Suspense } from "react";
import BookSlot from "./components/BookSlot";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <BookSlot />
    </Suspense>
  );
}
