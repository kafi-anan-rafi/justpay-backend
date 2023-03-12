import { PartialType } from "@nestjs/mapped-types";
import { SignupAgentDto } from "./signup-agent.dto";

export class UpdateAgentDto extends PartialType(SignupAgentDto) { }