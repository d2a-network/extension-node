import { writable } from "svelte/store";

export const nodeId = writable(null);
export const nodeName = writable("no name");
export const currentPlatform = writable(false);
