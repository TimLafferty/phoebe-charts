import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { ZodError } from 'zod';
import { lineChartRequestSchema } from '../renderers/lineChart/schema';
import { renderLineChartSvg } from '../renderers/lineChart/renderLineChartSvg';
import { badRequest, internalServerError } from '../utils/httpResponses';

app.http('lineChartSvg', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'charts/line.svg',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    try {
      const body = await request.json();
      const parsed = lineChartRequestSchema.parse(body);
      const svg = renderLineChartSvg(parsed);

      return {
        status: 200,
        body: svg,
        headers: {
          'content-type': 'image/svg+xml; charset=utf-8',
          'cache-control': 'no-store',
        },
      };
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return badRequest('Invalid request body', error.flatten());
      }
      return internalServerError('Failed to render line chart', error);
    }
  },
});

