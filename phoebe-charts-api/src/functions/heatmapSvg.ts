import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { ZodError } from 'zod';
import { heatmapRequestSchema } from '../renderers/heatmap/schema';
import { renderHeatmapSvg } from '../renderers/heatmap/renderHeatmapSvg';
import { badRequest, internalServerError } from '../utils/httpResponses';

app.http('heatmapSvg', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'charts/heatmap.svg',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    try {
      const body = await request.json();
      const parsed = heatmapRequestSchema.parse(body);
      const svg = renderHeatmapSvg(parsed);

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
      return internalServerError('Failed to render heatmap', error);
    }
  },
});

