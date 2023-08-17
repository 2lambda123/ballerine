import { PasswordService } from '@/auth/password/password.service';
import { BusinessRepository } from '@/business/business.repository';
import { ColectionFlowController } from '@/collection-flow/collection-flow.controller';
import { CollectionFlowService } from '@/collection-flow/collection-flow.service';
import { WorkflowAdapterManager } from '@/collection-flow/workflow-adapter.manager';
import { AppLoggerModule } from '@/common/app-logger/app-logger.module';
import { EntityRepository } from '@/common/entity/entity.repository';
import { EndUserRepository } from '@/end-user/end-user.repository';
import { EndUserService } from '@/end-user/end-user.service';
import { DocumentChangedWebhookCaller } from '@/events/document-changed-webhook-caller';
import { WorkflowCompletedWebhookCaller } from '@/events/workflow-completed-webhook-caller';
import { WorkflowStateChangedWebhookCaller } from '@/events/workflow-state-changed-webhook-caller';
import { FilterRepository } from '@/filter/filter.repository';
import { FilterService } from '@/filter/filter.service';
import { FileService } from '@/providers/file/file.service';
import { FileRepository } from '@/storage/storage.repository';
import { StorageService } from '@/storage/storage.service';
import { UserRepository } from '@/user/user.repository';
import { UserService } from '@/user/user.service';
import { HookCallbackHandlerService } from '@/workflow/hook-callback-handler.service';
import { WorkflowDefinitionRepository } from '@/workflow/workflow-definition.repository';
import { WorkflowEventEmitterService } from '@/workflow/workflow-event-emitter.service';
import { WorkflowRuntimeDataRepository } from '@/workflow/workflow-runtime-data.repository';
import { WorkflowService } from '@/workflow/workflow.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppLoggerModule, HttpModule],
  controllers: [ColectionFlowController],
  providers: [
    CollectionFlowService,
    EndUserService,
    EndUserRepository,
    WorkflowRuntimeDataRepository,
    WorkflowAdapterManager,
    WorkflowDefinitionRepository,
    BusinessRepository,
    EntityRepository,
    StorageService,
    FileRepository,
    WorkflowService,
    HookCallbackHandlerService,
    FileService,
    WorkflowEventEmitterService,
    DocumentChangedWebhookCaller,
    WorkflowCompletedWebhookCaller,
    WorkflowStateChangedWebhookCaller,
    FilterRepository,
    FilterService,
    UserService,
    UserRepository,
    PasswordService,
  ],
})
export class CollectionFlowModule {}
