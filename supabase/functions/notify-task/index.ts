// Supabase Edge Function: notify-task
// Deno runtime: deployed via `supabase functions deploy notify-task`

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: Record<string, unknown>;
  schema: string;
}

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload: WebhookPayload = await req.json();

    console.log(`[Task Webhook] Received ${payload.type} event on ${payload.table}:`, payload.record);

    // Business logic: Send notification email, webhook or slack alert
    // e.g. if priority is urgent:
    if (payload.record && payload.record.priority === 'urgent') {
      console.log(`[Alert] Urgent task created or updated: ${payload.record.title}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification processed' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
