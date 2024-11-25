import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db, TrackingData } from '@/lib/db';

// interface TrackingData {
//   timestamp: string;
//   ip: string;
//   userAgent: string;
//   query: string;
// }

async function getTrackingData(): Promise<TrackingData[]> {
  return await db.getAllEntries();
}

export default async function Dashboard() {
  const trackingData = await getTrackingData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pixel Tracking Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tracking Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead>Query</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trackingData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.timestamp}</TableCell>
                  <TableCell>{data.ip}</TableCell>
                  <TableCell>{data.userAgent}</TableCell>
                  <TableCell>{data.query}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

