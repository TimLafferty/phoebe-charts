import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { ZodError } from 'zod';
import { kpiGoalTrackerRequestSchema } from '../renderers/kpiGoalTracker/schema';
import { renderKpiGoalTrackerSvg } from '../renderers/kpiGoalTracker/renderKpiGoalTrackerSvg';
import { badRequest, internalServerError } from '../utils/httpResponses';

app.http('kpiGoalTrackerSvg', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'charts/kpi-goal-tracker.svg',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    try {
      const body = await request.json();
      const parsed = kpiGoalTrackerRequestSchema.parse(body);
      const svg = renderKpiGoalTrackerSvg(parsed);

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
      return internalServerError('Failed to render KPI goal tracker', error);
    }
  },
});

