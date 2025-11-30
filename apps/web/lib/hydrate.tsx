'use client';

import { type ReactNode } from 'react';
import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';

export function HydrateClient({
  children,
  state,
}: {
  children: ReactNode;
  state: DehydratedState;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
