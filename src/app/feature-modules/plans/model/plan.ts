import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/model/adapter';
import { PhenotypingAttempt } from '../../attempts/model/phenotyping/phenotyping_attempt';
import { StatusDate } from 'src/app/model/bio/status-date';
import { StatusTransition } from 'src/app/model/status_transition/status_transition';
import { PhenotypingStartingPoint } from '../../attempts/model/phenotyping/phenotyping_starting_point';
import { CrisprAttempt, CrisprAttemptAdapter } from '../../attempts/model/production/crispr/crispr-attempt';
import { EsCellAttempt, EsCellAttemptAdapter } from '../../attempts/model/production/escell/escell-attempt';
import { CreAlleleModificationAttempt } from '../../attempts/model/production/cre-allele-modification/cre-allele-modification-attempt';
import { InputHandlerService } from 'src/app/core/services/input-handler.service';
import { CreAlleleModificationStartingPoint } from '../../attempts';

export class Plan {
    id: number;
    pin: string;
    projectId: number;
    tpn: string;
    funderNames: string[];
    workUnitName: string;
    workGroupName: string;
    isActive: boolean;
    statusName: string;
    summaryStatusName: string;
    statusDates: StatusDate[];
    typeName: string;
    attemptTypeName: string;
    parentColonyName: string;
    comment: string;
    crisprAttempt: CrisprAttempt;
    esCellAttempt: EsCellAttempt;
    creAlleleModificationAttempt: CreAlleleModificationAttempt;
    creAlleleModificationStartingPoint: CreAlleleModificationStartingPoint;
    phenotypingAttemptResponse: PhenotypingAttempt;
    // Need to keep this copy because phenotypingAttemptResponse is not processed by the update/create endpoint
    phenotypingAttempt: PhenotypingAttempt;
    statusTransition: StatusTransition;
    // Applies only to phenotyping plans
    phenotypingStartingPoint: PhenotypingStartingPoint;
    // eslint-disable-next-line
    _links: any;
}

@Injectable({
    providedIn: 'root'
})
export class PlanAdapter implements Adapter<Plan> {
    constructor(
        private crisprAttemptAdapter: CrisprAttemptAdapter,
        private escellAttemptAdapter: EsCellAttemptAdapter,
        private inputHandlerService: InputHandlerService) { }

    adapt(item): Plan {
        const plan = item as Plan;
        plan.comment = this.inputHandlerService.getEmptyIfNull(plan.comment);

        if (plan.crisprAttempt) {
            plan.crisprAttempt = this.crisprAttemptAdapter.adapt(plan.crisprAttempt);
        }
        if (plan.attemptTypeName === 'crispr' || plan.attemptTypeName === 'haplo-essential crispr') {
            if (!plan.crisprAttempt) {
                plan.crisprAttempt = new CrisprAttempt();
            }
        }

        if (plan.esCellAttempt) {
            plan.esCellAttempt = this.escellAttemptAdapter.adapt(plan.esCellAttempt);
        }
        if (plan.attemptTypeName === 'es cell') {
            if (!plan.esCellAttempt) {
                plan.esCellAttempt = new EsCellAttempt();
            }
        }

        if (plan.attemptTypeName === 'cre allele modification') {
            if (!plan.creAlleleModificationAttempt) {
                plan.creAlleleModificationAttempt = new CreAlleleModificationAttempt();
            }
        }

        if (plan.attemptTypeName === 'adult and embryo phenotyping' || plan.attemptTypeName === 'haplo-essential phenotyping') {
            if (!plan.phenotypingAttempt) {
                plan.phenotypingAttempt = new PhenotypingAttempt();
            }
        }

        return plan;
    }
}
