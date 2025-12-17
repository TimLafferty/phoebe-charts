import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

app.http('healthz', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'healthz',
  handler: async (_request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    context.log('healthz');
    return {
      status: 200,
      jsonBody: { ok: true, service: 'phoebe-charts-api' },
    };
  },
});

