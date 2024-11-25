"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useQuery } from "convex/react";

export default function Home() {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pixel Tracker</h1>
      <div className="space-y-4">
        <p>
          This is an example of a 1x1 tracking pixel:
        </p>
        <img src="/api/pixel?example=true" alt="" width="1" height="1" />
        <p>
          (You won&apos;t see it, but it&apos;s there!)
        </p>
        <Button asChild>
          <Link href="/dashboard">View Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

