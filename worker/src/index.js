export default {
    async fetch(request, env) {
        // Handle CORS for all requests
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle preflight OPTIONS request
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        const path = url.pathname;

        try {
            // GET /applications — fetch all applications
            if (path === '/applications' && request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    'SELECT * FROM applications ORDER BY created_at DESC'
                ).all();
                return Response.json(results, { headers: corsHeaders });
            }

            // POST /applications — add new application
            if (path === '/applications' && request.method === 'POST') {
                const body = await request.json();
                const { id, title, company, date, status, match, notes, applyUrl, source } = body;

                await env.DB.prepare(
                    `INSERT INTO applications (id, title, company, date, status, match, notes, applyUrl, source)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
                ).bind(id, title, company, date, status, match || 80, notes || '', applyUrl || '', source || '').run();

                return Response.json({ success: true, id }, { headers: corsHeaders });
            }

            // PUT /applications/:id — update status of an application
            if (path.startsWith('/applications/') && request.method === 'PUT') {
                const id = path.split('/')[2];
                const body = await request.json();
                const { status, notes } = body;

                await env.DB.prepare(
                    'UPDATE applications SET status = ?, notes = ? WHERE id = ?'
                ).bind(status, notes || '', id).run();

                return Response.json({ success: true }, { headers: corsHeaders });
            }

            // DELETE /applications/:id — delete an application
            if (path.startsWith('/applications/') && request.method === 'DELETE') {
                const id = path.split('/')[2];
                await env.DB.prepare('DELETE FROM applications WHERE id = ?').bind(id).run();
                return Response.json({ success: true }, { headers: corsHeaders });
            }

            // DELETE /applications — clear all applications
            if (path === '/applications' && request.method === 'DELETE') {
                await env.DB.prepare('DELETE FROM applications').run();
                return Response.json({ success: true }, { headers: corsHeaders });
            }

            // Health check
            if (path === '/health') {
                return Response.json({ status: 'ok' }, { headers: corsHeaders });
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });

        } catch (error) {
            return Response.json(
                { error: error.message },
                { status: 500, headers: corsHeaders }
            );
        }
    }
};
