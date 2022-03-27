import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request } from "express";
import { AutoRespond, handleValidation } from "../api";
import {
  ApproveTransferRequestReq,
  CreateTransferRequest,
  GetOrganisationPendingApprovalRes,
} from "../models";
import { transferRequestService } from "../services";
import { toOrganisationPendingApprovals } from "../transformers";

@Controller("transferRequest")
export class TransferRequestController {
  @Post("create")
  @AutoRespond()
  @Middleware(handleValidation)
  async createTransferRequest(req: Request): Promise<number> {
    const input: CreateTransferRequest = req.body;
    const data = await transferRequestService.createTransferRequest(input);
    return data;
  }

  @Get("pendingApprovals/:id")
  @AutoRespond()
  @Middleware(handleValidation)
  async getOrganisationPendingApprovals(
    req: Request
  ): Promise<GetOrganisationPendingApprovalRes[]> {
    const id = req.params.id as unknown as number;
    const data = await transferRequestService.getOrganisationPendingApprovals(
      id
    );
    return data.map((record) => toOrganisationPendingApprovals(record));
  }

  @Post("approve")
  @AutoRespond()
  @Middleware(handleValidation)
  async approveTransfers(req: Request): Promise<void> {
    const input: ApproveTransferRequestReq = req.body;
    await transferRequestService.approveTransfers(input);
  }
}
