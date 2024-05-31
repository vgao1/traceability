import DocCollection, { BaseDoc } from "../framework/doc";
import { ObjectId } from "mongodb";

export interface TraceabilityDoc extends BaseDoc {
  data_subject: ObjectId;
  data_provider: string;
  data_recipient: string;
  description: string;
  service_id: ObjectId;
  data: Array<Record<string, string>>;
}

export default class TraceabilityConcept {
  public readonly recipientTraceabilityRecord = new DocCollection<TraceabilityDoc>("recipient-traceability");
  public readonly providerTraceabilityRecord = new DocCollection<TraceabilityDoc>("provider-traceability");

  async getTraceabilityRecords(data_subject: ObjectId) {
    const providerRecords = await this.providerTraceabilityRecord.readMany(
      { data_subject },
      {
        sort: { dateCreated: -1 },
      },
    );
    const recipientRecords = await this.recipientTraceabilityRecord.readMany(
      { data_subject },
      {
        sort: { dateCreated: -1 },
      },
    );
    return { providerRecords, recipientRecords };
  }
}
