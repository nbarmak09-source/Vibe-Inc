"use client";

export const EDUCATION_PROGRESS_EVENT = "education-progress-change";
const COMPLETION_PREFIX = "education:completed:";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getCompletionKey(id: string) {
  return `${COMPLETION_PREFIX}${id}`;
}

export function getCompletionState(id: string) {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(getCompletionKey(id)) === "true";
}

export function setCompletionState(id: string, value: boolean) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(getCompletionKey(id), value ? "true" : "false");
  window.dispatchEvent(
    new CustomEvent(EDUCATION_PROGRESS_EVENT, { detail: { id, value } })
  );
}
