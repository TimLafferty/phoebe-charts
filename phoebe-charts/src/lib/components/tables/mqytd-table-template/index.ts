// =============================================================================
// MQYTD Table Template - Public API
// =============================================================================

// -----------------------------------------------------------------------------
// Model exports
// -----------------------------------------------------------------------------
export type {
  MqytdPeriodComparison,
  MqytdRow,
  MqytdGroup,
  MqytdPeriodHeader,
  MqytdDateRange,
  MqytdPeriodDateRange,
  MqytdFooterDates,
  MqytdColumnWidths,
  MqytdConfig
} from '../../../models/tables/mqytd-table-template.model';

export { DEFAULT_MQYTD_CONFIG } from '../../../models/tables/mqytd-table-template.model';

// -----------------------------------------------------------------------------
// Service exports
// -----------------------------------------------------------------------------
export { MqytdTableTemplateService } from '../../../services/tables/mqytd-table-template.service';
export type { MqytdRowInput, MqytdGroupInput } from '../../../services/tables/mqytd-table-template.service';

// -----------------------------------------------------------------------------
// Component export
// -----------------------------------------------------------------------------
export { MqytdTableTemplateComponent } from './mqytd-table-template.component';
