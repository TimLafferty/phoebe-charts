// =============================================================================
// MQY Table Template - Public API
// =============================================================================

// -----------------------------------------------------------------------------
// Model exports
// -----------------------------------------------------------------------------
export type {
  MqyPeriodComparison,
  MqyRow,
  MqyGroup,
  MqyPeriodHeader,
  MqyDateRange,
  MqyPeriodDateRange,
  MqyFooterDates,
  MqyColumnWidths,
  MqyConfig
} from '../../../models/tables/mqy-table-template.model';

export { DEFAULT_MQY_CONFIG } from '../../../models/tables/mqy-table-template.model';

// -----------------------------------------------------------------------------
// Service exports
// -----------------------------------------------------------------------------
export { MqyTableTemplateService } from '../../../services/tables/mqy-table-template.service';
export type { MqyRowInput, MqyGroupInput } from '../../../services/tables/mqy-table-template.service';

// -----------------------------------------------------------------------------
// Component export
// -----------------------------------------------------------------------------
export { MqyTableTemplateComponent } from './mqy-table-template.component';
