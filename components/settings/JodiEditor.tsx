// components/JoditEditorClient.tsx
"use client";

import dynamic from "next/dynamic";

export const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
